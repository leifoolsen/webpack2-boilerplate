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
const outputPath = config.output.path || path.resolve(process.cwd(), 'dist');

const app = express();

if(isHot) {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, config.devServer));
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));
}
else {
  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  const compression = require('compression');
  app.use(compression());
}

// Middleware for handling JSON, Raw, Text and URL encoded form data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Router
app.use('/api', router);

// To proxy e.g. the /api, use 'http-proxy-middleware'
// Not provided in this example

if(config.devServer.historyApiFallback) {
  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  const history = require('connect-history-api-fallback');
  app.use(history(config.devServer.historyApiFallback));
}

app.use(config.devServer.publicPath, express.static(outputPath));

const fs = require('fs');
app.get('*', (req, res) => {
  fs.readFile(path.join(outputPath, 'index.html'), (err, file) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(file.toString());
    }
  });
});


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
