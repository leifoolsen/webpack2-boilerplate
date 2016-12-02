// Polyfills fetch, generator, ++
import 'babel-polyfill';

import App from './app/app';

import './styles.scss';

if (module.hot) {
  // This tells Webpack that this file and all of its dependencies can be replaced.
  // See e.g: http://andrewhfarmer.com/webpack-hmr-tutorial/
  module.hot.accept();

  // Enables HTML HMR. Also enable/uncomment html-loader in webpack.config
  require('./index.html');
}

// Start
window.addEventListener('load', () => App.run());

