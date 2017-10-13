import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import config from '../config';
import logger from './logger';
import apiRouter from './api-router';
import { notFound, logErrors, clientErrorHandler, errorHandler } from './error-handlers';
import { NotFoundException } from './exceptions';

// Set Winston console log level
logger.transports.console.level = config.logger.console.level;

// console.log === console.log in webpack.config
//eslint-disable-next-line no-console
console.log('express:',
  `NODE_ENV: "${process.env.NODE_ENV}",`,
  `isProd: ${config.isProd},`,
  `isDev: ${config.isDev},`,
  `isTest: ${config.isTest},`,
  `isHot: ${config.isHot},`,
  `loglevel: "${config.logger.console.level}",`,
  `public: "${config.server.publicPath}",`,
  `api: "${config.apiPath}"`);

let devMiddleware = null;

const app = express();
app.disable('x-powered-by');

// Middleware for handling JSON, Raw, Text and URL encoded form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (config.server.compress) {
  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  const compression = require('compression'); // eslint-disable-line global-require
  app.use(compression());
}

if (config.proxy) {
  // Proxy to api server
  const proxy = require('http-proxy-middleware'); // eslint-disable-line global-require

  const useProxy = (proxyConfig) => {
    app.use(proxy(proxyConfig.context, {
      ...proxyConfig.options,
      onProxyReq(req) {
        logger.info(`Proxy to: ${req.path}`);
      }
    }));
  };

  if (Array.isArray(config.proxy)) {
    config.proxy.forEach( p => {
      useProxy(p);
    });
  }
  else {
    useProxy(config.proxy);
  }
}
else {
  // Api routes
  app.use(config.apiPath, apiRouter);
}

// Uncomment to disable historyApiFallback without modifying config files
//config.server.historyApiFallback = false;

if (config.server.historyApiFallback) {
  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  const history = require('connect-history-api-fallback'); // eslint-disable-line global-require
  app.use(history(config.server.historyApiFallback));
}

if (config.isProd && !config.isTest) {
  app.use(config.server.publicPath, express.static(config.server.contentBase));

  app.get('*', (req, res, next) => {
    const filename = req.path.startsWith(config.server.publicPath)
      ? req.path.replace(config.server.publicPath, '')
      : req.path;

    const filepath = filename.indexOf('.') > -1
      ? path.join(config.server.contentBase, filename)
      : path.join(config.server.contentBase, 'index.html');

    logger.info('### app.get * from:', req.path, ' to:', filepath);

    res.sendFile(filepath, err => {
      if (err) {
        next(NotFoundException(filepath));
      }
    });
  });
}

if (config.isDev || config.isTest) {
  // Step 1: Create & configure a webpack compiler
  const webpack = require('webpack'); // eslint-disable-line global-require
  const webpackConfig = require('../webpack.config.babel'); // eslint-disable-line global-require
  const webpackCompiler = webpack(webpackConfig);
  webpackCompiler.apply(new webpack.ProgressPlugin());

  // Step 2: Attach the dev middleware to the compiler & the server
  const webpackDevMiddleware = require('webpack-dev-middleware'); // eslint-disable-line global-require

  // Config options:
  // see: https://webpack.github.io/docs/webpack-dev-server.html
  // see: https://webpack.js.org/configuration/dev-server/
  // see: https://github.com/webpack/webpack-dev-middleware
  // see: https://github.com/chimurai/http-proxy-middleware
  // see: https://github.com/bripkens/connect-history-api-fallback
  // NOTE: Only use options compatible with webpack-dev-middleware
  devMiddleware = webpackDevMiddleware(webpackCompiler, {
    publicPath: config.server.publicPath,
    contentBase: config.server.contentBase,
    hot: config.isHot,
    compress: config.server.compress || false,
    noInfo: true,
    stats: {
      colors: true,
    },
    inline: true,
    lazy: false,
    headers: {'Access-Control-Allow-Origin': '*'},
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    open: true,
  });
  app.use(devMiddleware);

  if (config.isHot) {
    // Step 3: Attach the hot middleware to the compiler & the server
    // See: https://github.com/glenjamin/webpack-hot-middleware
    const webpackHotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line global-require
    const hotMiddleware = webpackHotMiddleware(webpackCompiler, {
      path: '/__webpack_hmr'
      // You can use full urls, like:
      // path: `http://${host}:${port}${publicPath}/__webpack_hmr`
      // Remember to update webpack-hot-middleware in ../webpack-config.babel
    });
    app.use(hotMiddleware);
  }

  app.use(config.server.publicPath, express.static(config.server.contentBase));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = devMiddleware.fileSystem;

  app.get('*', (req, res, next) => {

    const filename = req.path.startsWith(config.server.publicPath)
      ? req.path.replace(config.server.publicPath, '')
      : req.path;

    if (filename.indexOf('.') > -1 && !(filename.endsWith('.html') || filename.endsWith('.map') || filename.endsWith('.dll.js'))) {
      const filepath = path.join(config.server.contentBase, filename);

      logger.info('### app.get * from:', req.path, ' to:', filepath);

      res.sendFile(filepath, err => {
        if (err) {
          next(NotFoundException(filepath));
        }
      });
    }
    else {
      const name = filename.endsWith('.map') || filename.endsWith('.dll.js') ? filename : 'index.html';
      const filepath = path.join(webpackCompiler.outputPath, name);

      logger.info('@@@ app.get * from:', req.path, ' to:', filepath);

      fs.readFile(filepath, (err, file) => {
        if (err) {
          next(NotFoundException(filepath));
        } else {
          res.send(file.toString());
        }
      });
    }
  });
}

// Catch 404 and forward to error handler
app.use(notFound);

// Error handlers
app.use(logErrors);          // Log errors
app.use(clientErrorHandler); // Client error handler
app.use(errorHandler);       // Catch all error handler

// See: https://nodejs.org/api/process.html#process_event_unhandledrejection
process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at:', p, 'reason:', reason);
});

// See: https://nodejs.org/api/process.html#process_event_uncaughtexception
process.on('uncaughtException', err => {
  logger.error('Server Uncaught Exception ', err);
  process.exit(1);
});

export default app;
export { devMiddleware };
