/**
 * Code inspired by https://github.com/mxstbr/react-boilerplate/blob/master/server/middlewares/frontendMiddleware.js
 */

import 'babel-polyfill';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import config from '../webpack.config.babel';
import router from './router';
import logger from './logger';

const argv = require('./array-to-key-value').arrayToKeyValue(process.argv.slice(2));
const isHot = argv.hot || false;
const publicPath = config.devServer.publicPath;


const app = express();

// Middleware for handling JSON, Raw, Text and URL encoded form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Api router. Must be defined before any app.get
// To set up a proxy for the /api, use 'http-proxy-middleware'.
// Not provided in this example
app.use('/api', router);

if(config.devServer.historyApiFallback) {
  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  const history = require('connect-history-api-fallback');
  app.use(history(config.devServer.historyApiFallback));
}

if(isHot) {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(config);
  const devMiddleware = webpackDevMiddleware(compiler, config.devServer);

  app.use(devMiddleware);
  app.use(webpackHotMiddleware(compiler, {
    //log: console.log,
    path: path.join(publicPath, '__webpack_hmr'),
    //heartbeat: 10 * 1000,
  }));

  app.use(publicPath, express.static(config.context));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = devMiddleware.fileSystem;

  app.get(/\.dll\.js$/, (req, res) => {
    const filename = req.path.replace(new RegExp(publicPath), '');
    res.sendFile(path.join(process.cwd(), 'dist', filename));
  });

  app.get(/\.map$/, (req, res) => {
    const filename = req.path.replace(/^\//, '');
    fs.readFile(path.join(compiler.outputPath, filename), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });

  app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
}
else {
  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  const compression = require('compression');
  app.use(compression());

  // Eventually override output path in production
  const outputPath = process.env.OUTPUT_PATH || argv['output-path'] || config.output.path;

  app.use(publicPath, express.static(outputPath));

  app.get(/\.map$/, (req, res) => {
    const filename = req.path.replace(/^\//, '');
    res.sendFile(path.resolve(outputPath, filename))
  });

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(outputPath, 'index.html'))
  });
}

process.on('uncaughtException', err => {
  logger.error('Uncaught Exception ', err.stack);
  process.exit(1)
});

app.listen(config.devServer.port, config.devServer.host, (err) => {
  if(err) {
    logger.error(err.message);
  }
  else {
    logger.serverStarted(config.devServer.port);
  }
});
