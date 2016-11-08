// See: https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
// See: http://www.asbjornenge.com/wwc/testing_react_components.html

const exposedProperties = ['window', 'navigator', 'document'];
const defaultHtml = '<!doctype html><html><head><meta charset="utf-8"></head><body><div id="mount"></div></body></html>';
const jsdom = require('jsdom');

function storageMock() {
  const storage = {};

  return {
    setItem(key, value) {
      storage[key] = value || '';
    },
    getItem(key) {
      return storage[key];
    },
    removeItem(key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key(i) {
      const keys = Object.keys(storage);
      return keys[i] || null;
    },
  };
}

const initDom = (markup = '') => {

  if (typeof document !== 'undefined') return;

  console.log('Setting up fake browser globals using jsdom');

  global.document = jsdom.jsdom(markup, {
    url: 'http://localhost:12345/',
    virtualConsole: jsdom.createVirtualConsole().sendTo(console)
  });

  global.window = document.defaultView;
  window.basePath = '/';

  Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
      global[property] = document.defaultView[property];
    }
  });

  Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
      exposedProperties.push(property);
      global[property] = document.defaultView[property];
    }
  });

  global.navigator = {
    userAgent: 'node.js',
  };

  global.localStorage = global.window.localStorage = storageMock();
  global.sessionStorage = global.window.sessionStorage = storageMock();

  // ... add whatever browser globals your tests might need ...

};

(() => {
  initDom(defaultHtml);
})();

