// Polyfills fetch, generator, ++
import 'babel-polyfill';

import App from './app/app';

import './main.scss';

if (module.hot) {
  module.hot.accept();
  //require('./index.html'); // Enables HMR. Also enable/uncomment html-loader in webpack.config
}


// Start
window.addEventListener('load', () => new App().run());

