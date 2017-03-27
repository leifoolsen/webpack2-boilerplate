/**
 * Code inspired by https://github.com/mxstbr/react-boilerplate/blob/master/server/middlewares/frontendMiddleware.js
 */


// Code is a bit messy. In need of some refactoring :-)
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import 'babel-polyfill';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import router from './router';
import logger from './logger';

const argv = require('./args-to-key-value').argsToKeyValue(process.argv.slice(2));
const appCfg = require('../src/config/config-builder')(process.env.NODE_ENV);
const webpackCfg = require('../webpack.config.babel');

const isTest = process.env.NODE_ENV === 'test' || argv['env.test'] || false;
const isDev = !(process.env.NODE_ENV === 'production' || argv['env.prod']);
const isProd = !isDev;
const isHot = argv.hot || false;

const host = webpackCfg.devServer.host;
const port = webpackCfg.devServer.port;
const publicPath = webpackCfg.devServer.publicPath;
const apiPath = process.env.API_PATH || argv['api-path'] || appCfg.server.apiPath || '/api';

const isProxy = argv.proxy || false;
let proxyHost;
let proxyPort;
let proxyPath;

if (isProxy) {
  proxyHost = process.env.PROXY_HOST || argv['proxy-host'] || appCfg.proxyServer.host || 'localhost';
  proxyPort = process.env.PROXY_PORT || argv['proxy-port'] || appCfg.proxyServer.port || 8090;
  proxyPath = process.env.PROXY_PATH || argv['proxy-path'] || appCfg.proxyServer.path || '/api';
}

const app = express();
let devMiddleware = null;

logger.log('Express config:', 'NODE_ENV:', process.env.NODE_ENV,
  'test:', isTest, 'prod:', isProd, 'dev:', isDev,
  'hot:', isHot, 'public path:', publicPath, 'API path:', apiPath, 'proxy:', isProxy);


const proxyConfig = () => {
  // Proxy middleware
  const proxy = require('http-proxy-middleware'); // eslint-disable-line global-require
  app.use(proxy(proxyPath, {
    target: `http://${proxyHost}:${proxyPort}`,
    changeOrigin: true,
    onProxyReq(proxyReq) {
      logger.log(`Proxy to: ${proxyReq.path}`);
    }
  }));
};

const commonConfig = () => {
  // Middleware for handling JSON, Raw, Text and URL encoded form data
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  if (isProxy) {
    proxyConfig();
  }
  else {
    // Api router. Must be defined before any app.get
    // To set up a proxy for the /api, use 'http-proxy-middleware'.
    // Not provided in this example
    app.use(apiPath, router);
  }

  if(webpackCfg.devServer.historyApiFallback) {
    // This rewrites all routes requests to the root /index.html file
    // (ignoring file requests). If you want to implement universal
    // rendering, you'll want to remove this middleware.
    const history = require('connect-history-api-fallback'); // eslint-disable-line global-require
    app.use(history(webpackCfg.devServer.historyApiFallback));
  }
};

const webpackConfig = () => {
  const compiler = webpack(webpackCfg);
  const webpackDevMiddleware = require('webpack-dev-middleware');
  devMiddleware = webpackDevMiddleware(compiler, webpackCfg.devServer);
  app.use(devMiddleware);

  if(isHot) {
    const joinUrl = require('../src/utils/join-url'); // eslint-disable-line global-require
    const webpackHotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line global-require
    app.use(webpackHotMiddleware(compiler, {
      path: joinUrl(publicPath, '__webpack_hmr'),
    }));
  }

  app.use(publicPath, express.static(webpackCfg.context));

  app.get(/\.dll\.js$/, (req, res) => {
    const filename = req.path.startsWith(publicPath)
      ? req.path.replace(publicPath, '')
      : req.path;

    //console.log('### .dll.js', req.path, filename);

    res.sendFile(path.join(compiler.outputPath, filename));
  });

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = devMiddleware.fileSystem;

  app.get(/\.map$|\.htm[l]?$/, (req, res) => {
    const filename = req.path.replace(/^\//, '');

    //console.log('§§§ .map|.html', req.path, filename);

    fs.readFile(path.join(compiler.outputPath, filename), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });

  app.get('*', (req, res) => {
    const filename = req.path.startsWith(publicPath)
      ? req.path.replace(publicPath, '')
      : req.path;

    // console.log('@@@ *', req.path, filename);

    if (filename.indexOf('.') > -1) {
      res.sendFile(path.join(compiler.outputPath, filename), err => {
        if (err) {
          res.sendStatus(404);
        }
      });
    }
    else {
      fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
        if (err) {
          res.sendStatus(404);
        } else {
          res.send(file.toString());
        }
      });
    }
  });
};

const distConfig = () => {
  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  const compression = require('compression');
  app.use(compression());

  // Eventually override output path in production
  const outputPath = process.env.OUTPUT_PATH || argv['output-path'] || webpackCfg.output.path;

  app.use(publicPath, express.static(outputPath));

  app.get(/\.map$|\.htm[l]?$/, (req, res) => {
    const filename = req.path.replace(/^\//, '');
    //console.log('§§§ .map|.html', req.path, filename);

    res.sendFile(path.resolve(outputPath, filename), err => {
      if (err) {
        res.sendStatus(404);
      }
    });
  });


  app.get('*', (req, res) => {
    const filename = req.path.startsWith(publicPath)
      ? req.path.replace(publicPath, '')
      : req.path;

    //console.log('@@@ *', req.path, filename);

    if (filename.indexOf('.') > -1) {
      res.sendFile(path.join(outputPath, filename), err => {
        if (err) {
          res.sendStatus(404);
        }
      });
    }
    else {
      res.sendFile(path.resolve(outputPath, 'index.html'), err => {
        if (err) {
          res.sendStatus(404);
        }
      });
    }
  });
};

const setup = () => {
  logger.log('**** setup');

  commonConfig();

  if (isDev || isHot) {
    webpackConfig();
  }
  else {
    distConfig();
  }
};


const server = {
  app: app,
  handle: null,

  start: () => {
    const pingProxyServer = () => {
      const ping = require('node-http-ping'); // eslint-disable-line global-require
      ping(proxyHost, proxyPort)
        //.then(time => console.log(`Response time: ${time}ms`))
        .catch(error => {
          logger.error(`Could not connect to: ${proxyHost}:${proxyPort}. Error: ${error}\n` +
            'Try to restart the proxy server');
          process.exit(1);
        });
    };

    const startServer = () => {
      if (server.handle === null) {
        setup();

        server.handle = app.listen(port, host, (err) => {
          if (err) {
            logger.error(err.message);
            process.exit(1);
          }

          server.app.emit('serverStarted');
          logger.serverStarted(port, proxyPort, publicPath, isHot);

          if (isProxy) {
            pingProxyServer();
          }
        });
      }
    };

    if (devMiddleware) {
      devMiddleware.waitUntilValid(() => {
        logger.info('webpack is in a valid state');
        startServer();
      });
    }
    else {
      startServer();
    }
  },

  stop: (done = () => {}) => {
    if (server.handle !== null) {
      server.handle.close(done);
      server.handle = null;
      logger.log('Server stopped');
    }
  },
};


//
setup();

if (process.env.NODE_ENV !== 'test') {
  process.on('uncaughtException', err => {
    logger.error('Server Uncaught Exception ', err.stack);
    process.exit(1);
  });

  server.start();
}

// Export for test
module.exports = server;
export default server;
