import polyfill from './polyfill';
import run from './app/app';
import logger, {LOG_LEVEL} from './logger/logger';
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
   * @see: https://developer.mozilla.org/en/docs/Web/API/GlobalEventHandlers/onerror
   * @see https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror.html
   */
  window.onerror = function (msg, url, lineNo, columnNo, error) {
    const err = error || {};
    const detail = {
      name: err.name || (msg.toLowerCase().indexOf('script error.') > -1 ? 'Script error' : ''),
      line: lineNo,
      column: columnNo,
      url: url || '',
      stack: err.stack || (msg.toLowerCase().indexOf('script error.') > -1 ? 'See browser console for detail' : ''),
    };

    logger.remoteLogger.log(LOG_LEVEL.error, msg, detail);
    return false;
  };

  window.addEventListener('beforeunload', () => {
    logger.debug('Before unload. flushing remote logger');
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
window.addEventListener('load', () => {
  polyfill().then(() => {
    require('./config/config'); // eslint-disable-line global-require
    run();
  });
});

