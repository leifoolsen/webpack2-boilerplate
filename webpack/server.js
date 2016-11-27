require('babel-polyfill');

const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');
const webpack = require('webpack');
const logger = require('./logger');
const argv = require('./array-to-key-value').arrayToKeyValue(process.argv.slice(2));
const isDev = process.env.NODE_ENV !== 'production' && !argv['env.prod'];
const isHot = argv['hot'] || false;

const config = require('./webpack.config.babel');
const publicPath = config.output.publicPath || '/';
const outputPath = config.output.path || path.resolve(process.cwd(), 'dist');

const host = 'localhost';
const port = process.env.PORT || argv.port || 3000;

const app = express();

// Middleware for handling JSON, Raw, Text and URL encoded form data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Sample REST API
const router = express.Router();

router.get('/', (req, res) => res.type('json').json( { api: '/api', ping: '/api/ping' }));

router.get('/ping', (req, res) => res.type('json').json( {ping: 'pong!'}));

router.get('*', (req, res) => res.sendStatus(404).end());
//

if(isHot) {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    lazy: false,
    noInfo: true,
    filename: config.output.filename,
    publicPath: publicPath,
    contentBase: config.context,
    silent: true,
    headers: {'Access-Control-Allow-Origin': '*'},
    hot: true,
    inline: true,
    stats: 'errors-only',
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

app.use('/api', router);

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement universal
// rendering, you'll want to remove this middleware.
app.use(history({
  verbose: false,
}));

app.use(publicPath, express.static(outputPath));

process.on('uncaughtException', evt => {
  logger.error('uncaughtException ', evt);
});


// get the intended port number, use port 3000 if not provided
app.listen(port, host, (err) => {
  if(err) {
    logger.error(err.message);
  }
  else {
    logger.serverStarted(port);
  }
});
