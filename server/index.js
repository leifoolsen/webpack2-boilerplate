/**
 * Code inspired by https://github.com/mxstbr/react-boilerplate/blob/master/server/middlewares/frontendMiddleware.js
 */


process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import 'babel-polyfill';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import router from './router';
import logger from './logger';
import argsToKeyValue from './args-to-key-value';
import configBuilder from '../src/config/config-builder';

const webpackCfg = require('../webpack.config.babel');
const argv = argsToKeyValue(process.argv.slice(2));
const appCfg = configBuilder(process.env.NODE_ENV);
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

// Code is (still) a bit messy. In need of some refactoring :-)

logger.log('Express config:', 'NODE_ENV:', process.env.NODE_ENV,
  'test:', isTest, 'prod:', isProd, 'dev:', isDev,
  'hot:', isHot, 'public path:', publicPath, 'API path:', apiPath, 'proxy:', isProxy);


// ------------------------
// Common config
// ------------------------
const app = express();
let devMiddleware = null;

if (isProxy) {
  // Proxy middleware
  const proxy = require('http-proxy-middleware'); // eslint-disable-line global-require
  app.use(proxy(proxyPath, {
    target: `http://${proxyHost}:${proxyPort}`,
    changeOrigin: true,
    onProxyReq(proxyReq) {
      logger.log(`Proxying to: ${proxyReq.path}`);
    }
  }));
}
else {
  // Middleware for handling JSON, Raw, Text and URL encoded form data
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Api router. Must be defined before any app.get
  app.use(apiPath, router);
}

if(webpackCfg.devServer.historyApiFallback) {
  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  const history = require('connect-history-api-fallback'); // eslint-disable-line global-require
  app.use(history(webpackCfg.devServer.historyApiFallback));
}

if (isDev || isHot) {
  // ------------------------
  // webpack config
  // ------------------------

  // Step 1: Create & configure a webpack compiler
  const compiler = webpack(webpackCfg);

  // Step 2: Attach the dev middleware to the compiler & the server
  const webpackDevMiddleware = require('webpack-dev-middleware'); // eslint-disable-line global-require

  //devMiddleware = webpackDevMiddleware(compiler, {
  //  noInfo: true,
  //  quiet: true,
  //  publicPath: publicPath
  //});
  devMiddleware = webpackDevMiddleware(compiler, webpackCfg.devServer);
  app.use(devMiddleware);


  if(isHot) {
    // Step 3: Attach the hot middleware to the compiler & the server
    // See: https://github.com/glenjamin/webpack-hot-middleware
    //
    // eslint-disable-next-line global-require
    // app.use(require('webpack-hot-middleware')(compiler, {
    //   log: console.log, // eslint-disable-line no-console // A function used to log lines, pass false to disable. Defaults to console.log
    //   heartbeat: 10 * 1000, // How often to send heartbeat updates to the client to keep the connection alive. Should be less than the client's timeout setting - usually set to half its value.
    //   path: '/__webpack_hmr', // The path which the middleware will serve the event stream on, must match the client setting
    //   // You can use full urls, like:
    //   // path: `http://${host}:${port}${publicPath}/__webpack_hmr`
    //   // Remember to update webpack-hot-middleware in ../webpack-config.babel
    // }));

    // eslint-disable-next-line global-require
    app.use(require('webpack-hot-middleware')(compiler));
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
}
else {
  // ------------------------
  // Dist/Build config
  // ------------------------

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
}

const server = {
  app: app,
  handle: null,

  start: () => {
    const pingProxyServer = () => {
      const ping = require('node-http-ping'); // eslint-disable-line global-require
      ping(proxyHost, proxyPort)
        .then(time => logger.log(`Proxy response time: ${time}ms`))
        .catch(error => {
          logger.error(`Could not connect to: ${proxyHost}:${proxyPort}. Error: ${error}\n` +
            'Try to restart the proxy server');
          process.exit(1);
        });
    };

    const startServer = () => {
      if (server.handle === null) {

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

if (process.env.NODE_ENV !== 'test') {
  process.on('uncaughtException', err => {
    logger.error('Server Uncaught Exception ', err.stack);
    process.exit(1);
  });

  server.start();
}

// Export for test
export default server;
