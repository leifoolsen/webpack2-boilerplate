import 'whatwg-fetch';
import run from './app/app';
import logger, {LOG_LEVEL} from './utils/logger';
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

// Start
// Konfigurer logging
const config = require('./config'); // eslint-disable-line global-require

logger.consoleLogger.level = config.logger.console.level || LOG_LEVEL.debug;
logger.remoteLogger.level = config.logger.remote.level || LOG_LEVEL.error;
logger.remoteLogger.batchSize = 1;

window.addEventListener('load', () => run());

