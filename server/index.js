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

const isDev = process.env.NODE_ENV !== 'production' && !argv['env.prod'];
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

  // reload - Set to true to auto-reload the page when webpack gets stuck. (React: use reload=false)
  // See: https://github.com/glenjamin/webpack-hot-middleware
  //config.entry.app.unshift(`webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr&timeout=20000&reload=true`);
  //config.entry.app.unshift('webpack-hot-middleware/client');
  config.entry.app.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true');

  // Webpack2: remove any reference to webpack/hot/dev-server or webpack/hot/only-dev-server
  // from your webpack config. Instead, use the reload config option of 'webpack-hot-middleware'.
  //config.entry.app.unshift('webpack/hot/only-dev-server');

  // Dynamically set the webpack public path at runtime below
  // See: http://webpack.github.io/docs/configuration.html#output-publicpath
  config.entry.app.unshift('./webpack-public-path.js');

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    contentBase: config.context,
    hot: true,
    inline: true,

    lazy: false,
    noInfo: true,
    //filename: 'bundle.app.js', //filename: config.output.filename,
    publicPath: publicPath, //publicPath: `http://${host}:${port}${publicPath}`, //publicPath: publicPath,
    silent: true,
    headers: {'Access-Control-Allow-Origin': '*'},
    stats: 'errors-only',
    historyApiFallback: true,
    //watchOptions: {
    //  poll: true
    //},
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
