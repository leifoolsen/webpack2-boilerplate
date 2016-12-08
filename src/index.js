// Polyfills fetch, generator, ++
import 'babel-polyfill';

//import App from './app/app';
import run from './app/app';

import './styles.scss';

if (module.hot) {
  // This tells Webpack that this file and all of its dependencies can be replaced.
  // See e.g: http://andrewhfarmer.com/webpack-hmr-tutorial/
  module.hot.accept();

  // Accept changes to this file for hot reloading.
  //module.hot.accept('./index.js');

  // Any changes to our App will cause a hotload re-render.
  module.hot.accept('./app/app', () => {
    const next = require('./app/app').default;
    next();
  });

  // Enables HTML HMR. Also enable/uncomment html-loader in webpack.config
  require('./index.html');
}

// Start
window.addEventListener('load', () => run());

