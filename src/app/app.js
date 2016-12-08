import ping from './ping';

const clickHandler = () => {
  const el = document.querySelector('#ping-response');
  ping(el);
};

const run = () => {
  console.info('***** Application started');
  document.querySelector('#btn-ping').addEventListener('click', clickHandler);
};

if (module.hot) {
  module.hot.dispose(function() {
    // Handle side effects
    document.querySelector('#btn-ping').removeEventListener('click', clickHandler);
  });
}

export default run;
