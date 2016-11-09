// See: https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
// See: http://www.asbjornenge.com/wwc/testing_react_components.html
// See: https://github.com/rstacruz/jsdom-global
// See: https://github.com/dmatteo/jsdomify
//

const exposedProperties = ['window', 'navigator', 'document'];
const defaultHtml = '<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>';
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

function setupJsDom(markup = defaultHtml, options={}) {

  if (typeof document !== 'undefined') return;

  //const opts = Object.assign({}, options, {virtualConsole: jsdom.createVirtualConsole().sendTo(console)});
  const opts = {...options, ...{ virtualConsole: jsdom.createVirtualConsole().sendTo(console) }};

  console.log('Setting up jsdom');

  //const document = jsdom.jsdom(markup, {
  //  url: 'http://localhost:12345/',
  //  virtualConsole: jsdom.createVirtualConsole().sendTo(console)
  //});
  const document = jsdom.jsdom(markup, opts);

  const window = document.defaultView;

  Object.keys(document.defaultView).forEach( key => {
    if (typeof global[key] === 'undefined') {
      exposedProperties.push(key);
      global[key] = document.defaultView[key];
    }
  });

  global.document = document;
  global.window = window;
  window.console = global.console;
  window.basePath = '/';
  global.navigator = {
    userAgent: 'node.js',
  };
  document.destroy = teardownJsDom;


  global.localStorage = global.window.localStorage = storageMock();
  global.sessionStorage = global.window.sessionStorage = storageMock();

  // ... add whatever browser globals your tests might need ...

}

function teardownJsDom() {
  console.log('Cleaning up jsdom');
  exposedProperties.forEach( key => delete global[key] );
}

export { setupJsDom, teardownJsDom };
