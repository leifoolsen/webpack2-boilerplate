/**
 * See: https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
 * See: http://www.asbjornenge.com/wwc/testing_react_components.html
 * See: https://github.com/rstacruz/jsdom-global
 * See: https://github.com/dmatteo/jsdomify
 * See: https://github.com/rstacruz/jsdom-global
 */

// See jsdom's lib/jsdom/living/index.js
const LIVING_KEYS = [
  'DOMException',
  'NamedNodeMap',
  'Attr',
  'Node',
  'Element',
  'DocumentFragment',
  'HTMLDocument',
  'Document',
  'CharacterData',
  'Comment',
  'DocumentType',
  'DOMImplementation',
  'ProcessingInstruction',
  'Text',
  'Event',
  'CustomEvent',
  'MessageEvent',
  'ErrorEvent',
  'HashChangeEvent',
  'PopStateEvent',
  'UIEvent',
  'MouseEvent',
  'KeyboardEvent',
  'TouchEvent',
  'ProgressEvent',
  'EventTarget',
  'Location',
  'History',
  'HTMLElement',
  'HTMLAnchorElement',
  'HTMLAppletElement',
  'HTMLAreaElement',
  'HTMLAudioElement',
  'HTMLBaseElement',
  'HTMLBodyElement',
  'HTMLBRElement',
  'HTMLButtonElement',
  'HTMLCanvasElement',
  'HTMLDataElement',
  'HTMLDataListElement',
  'HTMLDialogElement',
  'HTMLDirectoryElement',
  'HTMLDivElement',
  'HTMLDListElement',
  'HTMLEmbedElement',
  'HTMLFieldSetElement',
  'HTMLFontElement',
  'HTMLFormElement',
  'HTMLFrameElement',
  'HTMLFrameSetElement',
  'HTMLHeadingElement',
  'HTMLHeadElement',
  'HTMLHRElement',
  'HTMLHtmlElement',
  'HTMLIFrameElement',
  'HTMLImageElement',
  'HTMLInputElement',
  'HTMLLabelElement',
  'HTMLLegendElement',
  'HTMLLIElement',
  'HTMLLinkElement',
  'HTMLMapElement',
  'HTMLMediaElement',
  'HTMLMenuElement',
  'HTMLMetaElement',
  'HTMLMeterElement',
  'HTMLModElement',
  'HTMLObjectElement',
  'HTMLOListElement',
  'HTMLOptGroupElement',
  'HTMLOptionElement',
  'HTMLOutputElement',
  'HTMLParagraphElement',
  'HTMLParamElement',
  'HTMLPreElement',
  'HTMLProgressElement',
  'HTMLQuoteElement',
  'HTMLScriptElement',
  'HTMLSelectElement',
  'HTMLSourceElement',
  'HTMLSpanElement',
  'HTMLStyleElement',
  'HTMLTableCaptionElement',
  'HTMLTableCellElement',
  'HTMLTableColElement',
  'HTMLTableDataCellElement',
  'HTMLTableElement',
  'HTMLTableHeaderCellElement',
  'HTMLTimeElement',
  'HTMLTitleElement',
  'HTMLTableRowElement',
  'HTMLTableSectionElement',
  'HTMLTemplateElement',
  'HTMLTextAreaElement',
  'HTMLTrackElement',
  'HTMLUListElement',
  'HTMLUnknownElement',
  'HTMLVideoElement',
  'StyleSheet',
  'MediaList',
  'CSSStyleSheet',
  'CSSRule',
  'CSSStyleRule',
  'CSSMediaRule',
  'CSSImportRule',
  'CSSStyleDeclaration',
  'StyleSheetList',
  'XPathException',
  'XPathExpression',
  'XPathResult',
  'XPathEvaluator',
  'HTMLCollection',
  'NodeFilter',
  'NodeIterator',
  'NodeList',
  'Blob',
  'File',
  'FileList',
  'FormData',
  'XMLHttpRequest',
  'XMLHttpRequestEventTarget',
  'XMLHttpRequestUpload',
  'DOMTokenList',
  'URL'
];

const OTHER_KEYS = [
  'addEventListener',
  'alert',
  'atob',
  'blur',
  'btoa',
  /* 'clearInterval', */
  /* 'clearTimeout', */
  'close',
  'confirm',
  /* 'console', */
  'createPopup',
  'dispatchEvent',
  'document',
  'focus',
  'frames',
  'getComputedStyle',
  'history',
  'innerHeight',
  'innerWidth',
  'length',
  'location',
  'moveBy',
  'moveTo',
  'name',
  'navigator',
  'open',
  'outerHeight',
  'outerWidth',
  'pageXOffset',
  'pageYOffset',
  'parent',
  'postMessage',
  'print',
  'prompt',
  'removeEventListener',
  'resizeBy',
  'resizeTo',
  'screen',
  'screenLeft',
  'screenTop',
  'screenX',
  'screenY',
  'scroll',
  'scrollBy',
  'scrollLeft',
  'scrollTo',
  'scrollTop',
  'scrollX',
  'scrollY',
  'self',
  /* 'setInterval', */
  /* 'setTimeout', */
  'stop',
  /* 'toString', */
  'top',
  'window'
];

const EXPOSED_PROPERTIES = LIVING_KEYS.concat(OTHER_KEYS);
//const EXPOSED_PROPERTIES = ['window', 'navigator', 'document'];
const defaultHtml = '<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>';

// TODO: Start using jsdom-10.x.x new api
const jsdom = require('jsdom/lib/old-api.js');

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

function teardownJsDom() {
  //console.log('Cleaning up jsdom');
  EXPOSED_PROPERTIES.forEach(key => delete global[key]);
}

function setupJsDom(markup = defaultHtml, options = {}) {

  if (global.navigator &&
    global.navigator.userAgent &&
    global.navigator.userAgent.indexOf('Node.js') > -1 &&
    global.document &&
    typeof global.document.destroy === 'function') {

    return global.document.destroy;
  }

  //const opts = Object.assign({}, options, {virtualConsole: jsdom.createVirtualConsole().sendTo(console)});
  const opts = { ...options, ...{ virtualConsole: jsdom.createVirtualConsole().sendTo(console) } };
  const doc = jsdom.jsdom(markup, opts);

  global.document = doc;
  global.window = doc.defaultView;

  EXPOSED_PROPERTIES.forEach(key => {
    global[key] = window[key];
  });

  window.console = global.console;
  window.basePath = '/';
  global.navigator = {
    userAgent: 'Node.js',
  };

  // eslint-disable-next-line no-multi-assign
  global.localStorage = global.window.localStorage = storageMock();

  // eslint-disable-next-line no-multi-assign
  global.sessionStorage = global.window.sessionStorage = storageMock();

  const browserLocale = () => {
    // http://stackoverflow.com/questions/1043339/javascript-for-detecting-browser-language-preference
    return navigator.languages
      ? navigator.languages[0]
      : navigator.language || navigator.userLanguage;
  };

  if (!browserLocale()) {
    Object.defineProperty(navigator, 'language', {
      writable: false,
      value: 'en-US',
    });
  }

  window.onerror = () => console.log(arguments); //eslint-disable-line

  // ... add whatever browser globals your tests might need ...

  document.destroy = teardownJsDom;
  return global.document.destroy;
}

export { setupJsDom, teardownJsDom };
