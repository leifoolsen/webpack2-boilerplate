import config from '../config/config';
import logger from '../logger/logger';
import ping from './ping';

const badFunction = () => {
  const foo = {};
  return foo.bar(); // Throws "Script error"
};

const unhandledErrorHandler = () => {
  document.querySelector('#unhandled-error-response').textContent = 'Check your console and server log';
  badFunction();
};

const pingHandler = () => {
  logger.debug('pingHandler');
  const el = document.querySelector('#ping-response');
  ping(el);
};

const run = () => {
  logger.info(`Application run, env: ${config.env}, public path: ${config.server.publicPath}, API path: ${config.server.apiPath}`);

  const pingButton = document.querySelector('#btn-ping');
  pingButton.addEventListener('click', pingHandler);

  const unhandledErrorButton = document.querySelector('#btn-unhandled-error');
  unhandledErrorButton.addEventListener('click', unhandledErrorHandler);

  // Remove the most recently-added event handlers so that when the code runs again and
  // adds a new event handler, we don't end up with duplicate handlers.
  // See: http://andrewhfarmer.com/webpack-hmr-tutorial/
  if (module.hot) {
    module.hot.dispose(() => {
      logger.debug('Disposing handlers');
      pingButton.removeEventListener('click', pingHandler);
      unhandledErrorButton.removeEventListener('click', unhandledErrorHandler);
    });
  }
};

export default run;
