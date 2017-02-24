import logger from '../logger/logger';
import ping from './ping';

const badFunction = () => {
  const foo = {};
  return foo.bar(); // Throws "Script error"
  //  throw new Error('Bad function!');
};

const pingHandler = () => {
  const el = document.querySelector('#ping-response');
  ping(el);
};

const unhandledErrorHandler = () => {
  document.querySelector('#unhandled-error-response').textContent = 'Check your console and server log';
  badFunction();
};

const addListeners = () => {
  document.querySelector('#btn-ping').removeEventListener('click', pingHandler);
  document.querySelector('#btn-unhandled-error').removeEventListener('click', unhandledErrorHandler);
  document.querySelector('#btn-ping').addEventListener('click', pingHandler);
  document.querySelector('#btn-unhandled-error').addEventListener('click', unhandledErrorHandler);
};

const run = () => {
  addListeners();
  logger.info('Application loaded!');
};

if (module.hot) {
  // See e.g. http://andrewhfarmer.com/webpack-hmr-tutorial/
  module.hot.dispose(() => {
    // Handle side effects
    document.querySelector('#btn-ping').removeEventListener('click', pingHandler);
    document.querySelector('#btn-unhandled-error').removeEventListener('click', unhandledErrorHandler);
  });
}

export default run;
