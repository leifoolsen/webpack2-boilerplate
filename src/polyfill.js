/**
 * Polyfill on demand using import()
 * @See https://webpack.js.org/guides/code-splitting-async/
 * @See http://anzorb.com/we-dont-need-your-polyfills/
 * @see https://hackernoon.com/polyfills-everything-you-ever-wanted-to-know-or-maybe-a-bit-less-7c8de164e423
 * @see http://anujnair.com/blog/13-conditionally-load-multiple-polyfills-using-webpack-promises-and-code-splitting
 */
import 'core-js/es6/promise';

export default async function polyfill() {
  const promises = [];

  // eslint-disable-next-line no-underscore-dangle
  if (!window._babelPolyfill) {
    promises.push(await import('babel-polyfill'));
  }

  // Object.assign is not part of babel polyfill
  if (typeof Object.assign !== 'function') {
    promises.push(await import('core-js/fn/object/assign'));
  }

  if (!window.fetch) {
    promises.push(await import('whatwg-fetch'));
  }

  if (!window.Proxy) {
    promises.push(await import('harmony-reflect'));
  }

  if (!window.Intl) {
    promises.push(await import('intl'));
    promises.push(await import('intl/locale-data/jsonp/en.js'));
    promises.push(await import('intl/locale-data/jsonp/nb.js'));
  }

  if (typeof Element.prototype.closest !== 'function') {
    promises.push(await import('./utils/closest-polyfill'));
  }

  // ie11:  'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  const ua = window.navigator.userAgent;
  if (/Trident/.test(ua) && ua.indexOf('rv:')) {
    promises.push(await import('./utils/ie11-polyfill'));
  }
  //... other polyfills

  return await Promise.all(promises);
}
