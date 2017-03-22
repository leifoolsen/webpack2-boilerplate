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

const config = require('../webpack.config.babel');
const argv = require('./args-to-key-value').argsToKeyValue(process.argv.slice(2));

const isTest = process.env.NODE_ENV === 'test' || argv['env.test'] || false;
const isDev = !(process.env.NODE_ENV === 'production' || argv['env.prod']);
const isProd = !isDev;
const isHot = argv.hot || false;

const host = config.devServer.host;
const port = config.devServer.port;
const publicPath = config.devServer.publicPath;

const app = express();
let devMiddleware = null;

// eslint-disable-next-line no-console
console.log('Express config:', 'NODE_ENV:', process.env.NODE_ENV, 'test:', isTest, 'prod:', isProd, 'dev:', isDev, 'hot:', isHot, 'public path:', publicPath);

const commonConfig = () => {
  // Middleware for handling JSON, Raw, Text and URL encoded form data
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Api router. Must be defined before any app.get
  // To set up a proxy for the /api, use 'http-proxy-middleware'.
  // Not provided in this example
  app.use(path.join(publicPath, 'api'), router);


  if(config.devServer.historyApiFallback) {
    // This rewrites all routes requests to the root /index.html file
    // (ignoring file requests). If you want to implement universal
    // rendering, you'll want to remove this middleware.
    const history = require('connect-history-api-fallback');
    app.use(history(config.devServer.historyApiFallback));
  }
};

const webpackConfig = () => {
  const compiler = webpack(config);
  const webpackDevMiddleware = require('webpack-dev-middleware');
  devMiddleware = webpackDevMiddleware(compiler, config.devServer);
  app.use(devMiddleware);

  if(isHot) {
    const webpackHotMiddleware = require('webpack-hot-middleware');
    app.use(webpackHotMiddleware(compiler, {
      path: path.join(publicPath, '__webpack_hmr'),
    }));
  }

  app.use(publicPath, express.static(config.context));

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
  const outputPath = process.env.OUTPUT_PATH || argv['output-path'] || config.output.path;

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


const server = {
  app: app,
  handle: null,

  start: () => {
    const startServer = () => {
      if (server.handle === null) {
        server.handle = app.listen(port, host, (err) => {
          if (err) {
            logger.error(err.message);
            process.exit(1);
          }
          else {
            server.app.emit('serverStarted');
            logger.serverStarted(port, publicPath, isHot);
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

  stop: (done) => {
    if (server.handle !== null) {
      server.handle.close(done);
      server.handle = null;
    }
  },

};


//
commonConfig();

if (isDev || isHot) {
  webpackConfig();
}
else {
  distConfig();
}

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
