import ping from './ping';

const badFunction = () => {
  //const foo = {};
  //return foo.bar();
  throw new Error('Bad function!');
};

const pingHandler = () => {
  const el = document.querySelector('#ping-response');
  ping(el);
};

const unhandledErrorHandler = () => {
  document.querySelector('#unhandled-error-response').textContent = 'Check your server log';
  badFunction();
};

const run = () => {
  console.info('***** Application started');
  document.querySelector('#btn-ping').addEventListener('click', pingHandler);
  document.querySelector('#btn-unhandled-error').addEventListener('click', unhandledErrorHandler);
};

if (module.hot) {
  module.hot.dispose(function() {
    // Handle side effects
    document.querySelector('#btn-ping').removeEventListener('click', pingHandler);
    document.querySelector('#btn-unhandled-error').removeEventListener('click', unhandledErrorHandler);
  });
}

export default run;
