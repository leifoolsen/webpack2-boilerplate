const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const webpack = require('webpack');
const logger = require('./logger');
const argv = require('./array-to-key-value').arrayToKeyValue(process.argv.slice(2));
const isDev = process.env.NODE_ENV !== 'production' && !argv['env.prod'];

const app = express();

if(isDev) {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const config = require('./webpack.config.babel');
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    silent: true,
    stats: 'errors-only',
  }));
  app.use(webpackHotMiddleware(compiler));

}


// Folder to to serve public files
//app.use('/', express.static(path.resolve(__dirname, 'public')));

// node.js middleware for handling JSON, Raw, Text and URL encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// get the intended port number, use port 3000 if not provided
const port = process.env.PORT || argv.port || 3000;
const host = 'localhost';
const server = app.listen(port, host, (err) => {
  if(err) {
    logger.error(err.message);
  }
  else {
    logger.serverStarted(port);
  }
});


// Sample API
app.get('/api/ping', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json( {ping: 'pong!'} );
});

