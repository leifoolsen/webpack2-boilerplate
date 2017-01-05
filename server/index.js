import 'babel-polyfill';

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import history from 'connect-history-api-fallback';
import webpack from 'webpack';
import config from '../webpack.config.babel';
import router from './router';
import logger from './logger';
const argv = require('./array-to-key-value').arrayToKeyValue(process.argv.slice(2));

//const isDev = process.env.NODE_ENV !== 'production' && !argv['env.prod'];
const isHot = argv['hot'] || false;

const publicPath = config.output.publicPath || '/';
const outputPath = config.output.path || path.resolve(process.cwd(), 'dist');

// get the intended port number, use port 3000 if not provided
const host = 'localhost';
const port = process.env.PORT || argv.port || 3000;

const app = express();

if(isHot) {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: publicPath, // middleware can't access config, so we provide publicPath
    contentBase: config.context, //contentBase: `http://${host}:${port}`, // contentBase: config.context,
    stats: 'errors-only',
    hot: true,
    inline: true,
    lazy: false,
    historyApiFallback: true,
    headers: {'Access-Control-Allow-Origin': '*'},
    //silent: true,
    //filaname: 'app.js',
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));
}
else {
  const compression = require('compression');

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
}

// Middleware for handling JSON, Raw, Text and URL encoded form data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Router
app.use('/api', router);

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement universal
// rendering, you'll want to remove this middleware.
app.use(history({
  verbose: false,
}));


app.use(publicPath, express.static(outputPath));


process.on('uncaughtException', err => {
  logger.error('Uncaught Exception ', err.stack);
  process.exit(1)
});

app.listen(port, host, (err) => {
  if(err) {
    logger.error(err.message);
  }
  else {
    logger.serverStarted(port);
  }
});
