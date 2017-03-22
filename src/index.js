import 'whatwg-fetch';
import run from './app/app';
import logger, {LOG_LEVEL} from './logger/logger';
import joinUrl from './utils/join-url';

import './styles.scss';

// Unhandled errors should be sent to the server
if (window && !window.onerror) {
  window.onerror = function (msg, url, lineNo, columnNo, error) {

    error = error || {};
    error.fileName = error.fileName || url || null;
    error.lineNumber = error.lineNumber || lineNo || null;
    error.columnNumber = error.columnNumber || columnNo || null;

    const detail = {
      name: error.name || null,
      message: error.message || null,
      file: error.fileName,
      source: ((error.toSource && error.toSource()) || null),
      line: error.lineNumber,
      column: error.columnNumber,
      stack: error.stack || null,
    };

    // An uncaught error is dumped to console, so only need to log remote
    logger.remoteLogger.log(LOG_LEVEL.error, msg, detail);
    return false;
  };
}

if(window) {
  window.addEventListener('beforeunload', () => {
    logger.debug('before unload, flushing remote logger');
    logger.remoteLogger.flush();
  });
}

if (module.hot) {
  // This tells Webpack that this file and all of its dependencies can be replaced.
  // See e.g: http://andrewhfarmer.com/webpack-hmr-tutorial/
  module.hot.accept();

  // Accept changes to this file for hot reloading.
  // Enabling this may result in multiple page loads (flashing screen)
  //module.hot.accept('./index.js');

  // Any changes to our App will cause a hotload re-render.
  module.hot.accept('./app/app', () => {
    const next = require('./app/app').default;
    next();
  });

  // Enables HTML HMR. Also enable/uncomment html-loader in webpack.config
  // Enabling this may result in multiple page loads (flashing screen)
  require('./index.html');
}

// Get (and modify) config
// Note: The "process.env.NODE_ENV" and "process.env.PUBLIC_PATH" globals
// are injected by webpack during build using webpack.DefinePlugin.
const config = require('./config/config-builder.js')(process.env.NODE_ENV); // eslint-disable-line global-require
config.server.publicPath = process.env.PUBLIC_PATH; // TODO: override in config.js

// Configure logging
logger.consoleLogger.level = config.logger.console.level;
logger.remoteLogger.level = config.logger.remote.level;
logger.remoteLogger.batchSize = config.logger.remote.batchSize;
logger.remoteLogger.url = joinUrl(config.server.publicPath, config.logger.remote.url); // TODO: override in config.js

// Start
window.addEventListener('load', () => run());

