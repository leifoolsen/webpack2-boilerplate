import polyfill from './polyfill';
import './config/config';
import logger, {LOG_LEVEL} from './logger/logger';
import run from './app/app';
import './styles.scss';

if(window) {
  /**
   * An event handler for the error event.
   * When an error is thrown, the following arguments are passed to the function:
   * @param msg The message associated with the error, e.g. “Uncaught ReferenceError: foo is not defined”
   * @param url The URL of the script or document associated with the error, e.g. “/dist/app.js”
   * @param lineNo The line number (if available)
   * @param columnNo The column number (if available)
   * @param error The Error object associated with this error (if available)
   * @return {boolean}
   * @see https://developer.mozilla.org/en/docs/Web/API/GlobalEventHandlers/onerror
   * @see https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror.html
   */
  window.onerror = function (msg, url, lineNo, columnNo, error) {
    const err = error || {};
    const detail = {
      name: err.name || msg || '',
      line: lineNo,
      column: columnNo,
      url: url || '',
      stack: err.stack || 'See browser console for detail',
    };

    logger.remoteLogger.log(LOG_LEVEL.error, msg, detail);
    return false;
  };

  /**
   * Flush logger
   */
  window.addEventListener('beforeunload', () => {
    logger.debug('Before unload. Flushing remote logger');
    logger.remoteLogger.flush();
  });
}

// Add polyfills
try {
  polyfill()
    .then( () => run()); // Start the app
}
catch(err) {
  console.log('Error loading polyfills:', err); // eslint-disable-line no-console
}


if (module.hot) {
  // See: http://andrewhfarmer.com/webpack-hmr-tutorial/
  // See: https://survivejs.com/webpack/appendices/hmr/
  // See: https://medium.com/@baphemot/react-hot-module-reload-f6b3d34b9b86
  // See: https://webpack.js.org/guides/hmr-react/

  // This tells Webpack that this file and all of its dependencies can be replaced.
  // Normally you should not need this
  //module.hot.accept();

  // Any changes to our App will cause a hotload re-render.
  module.hot.accept('./app/app', () => {
    const next = require('./app/app').default;
    next();
  });
}
