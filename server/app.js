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

    const reqPath = req.path.startsWith(config.server.publicPath)
      ? req.path.replace(config.server.publicPath, '')
      : req.path;

    const target = reqPath.indexOf('.') > -1
      ? path.join(config.server.contentBase, reqPath)
      : path.join(config.server.contentBase, 'index.html');

    logger.info('### app.get * from:', req.path, 'to:', target);

    res.sendFile(target, err => {
      if (err) {
        next(NotFoundException(req.path));
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
  // Config options:
  //   see: https://github.com/webpack/webpack-dev-middleware
  //   see: https://webpack.js.org/configuration/dev-server/
  //   see: https://webpack.js.org/configuration/stats/
  //   see: https://webpack.github.io/docs/webpack-dev-server.html
  //   see: https://github.com/chimurai/http-proxy-middleware
  //   see: https://github.com/bripkens/connect-history-api-fallback
  //   NOTE: Only use options compatible with webpack-dev-middleware
  const webpackDevMiddleware = require('webpack-dev-middleware'); // eslint-disable-line global-require

  devMiddleware = webpackDevMiddleware(webpackCompiler, {
    publicPath: config.server.publicPath,
    stats: 'errors-only',
    /*
    stats: {
      errors: true,
      colors: true,
    },
    */
  });
  app.use(devMiddleware);

  // Step 3: Attach the hot middleware to the compiler & the server
  // Config options:
  //   See: https://github.com/glenjamin/webpack-hot-middleware
  if (config.isHot) {
    app.use(require('webpack-hot-middleware')(webpackCompiler));

    /*
    const webpackHotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line global-require
    const hotMiddleware = webpackHotMiddleware(webpackCompiler, {
      path: '/__webpack_hmr'
      // You can use full urls, like:
      // path: `http://${host}:${port}${publicPath}/__webpack_hmr`
      // Remember to update webpack-hot-middleware in ../webpack-config.babel
    });
    app.use(hotMiddleware);
    */
  }

  // Add public path after step 3
  app.use(config.server.publicPath, express.static(config.server.contentBase));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const memoryFs = devMiddleware.fileSystem;

  app.get('*', (req, res, next) => {

    const reqPath = req.path.startsWith(config.server.publicPath)
      ? req.path.replace(config.server.publicPath, '')
      : req.path;

    const target = reqPath.indexOf('.') > -1
      ? path.join(webpackCompiler.outputPath, reqPath)
      : path.join(webpackCompiler.outputPath, 'index.html');

    if (target.endsWith('.html')) {
      // 1: Read from memory fs
      logger.info('1 app.get * from:', req.path, 'to:', target);
      memoryFs.readFile(target, (err, file) => {
        if (err) {
          next(NotFoundException(req.path));
        } else {
          res.send(file.toString());
        }
      });
    }
    else {
      // 2: Try reading from outputPath, i.e. "dist"
      logger.info('2 app.get * from:', req.path, 'to:', target);
      res.sendFile(target, err => {
        if (err) {
          // 3: Try reading from src
          const src = path.join(config.server.contentBase, reqPath);
          logger.info('3 app.get * from:', req.path, 'to:', src);

          res.sendFile(src, err => {
            if (err) {
              next(NotFoundException(req.path));
            }
          });
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
