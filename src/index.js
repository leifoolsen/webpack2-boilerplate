// Polyfills fetch, generator, ++
import 'babel-polyfill';
import 'whatwg-fetch';

import run from './app/app';
import request from './utils/request';

import './styles.scss';


const serverLog = msg => {

  request('/api/log'  ,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: msg,
      })
    })
    .catch(err => err)
    .then(response => {
      console.log('**** response', response);
    });

};

// Unhandled errors should be sent to the server

if (window && !window.onerror) {
  window.onerror = function (msg, url, lineNo, columnNo, error) {

    console.log('#####', msg, url, lineNo, columnNo, error);
    serverLog(msg);
    return false;
  };
}

/*
 window.addEventListener('error', (e) => {
 //const stack = e.error.stack;
 //const message = e.error.toString();
 console.log('XXXXX', e.error, e.colno, e.filename, e.lineno, e.message, e);

 //e.stopPropagation();
 //e.preventDefault();
 return false;
 });
 */

if (module.hot) {
  // This tells Webpack that this file and all of its dependencies can be replaced.
  // See e.g: http://andrewhfarmer.com/webpack-hmr-tutorial/
  module.hot.accept();

  // Accept changes to this file for hot reloading.
  // Enabling this results in multiple page loads (flashing screen)
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
window.addEventListener('load', () => run());

