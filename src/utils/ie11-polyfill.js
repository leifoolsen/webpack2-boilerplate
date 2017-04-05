/*
 * ie11 polyfills
 * You should only load this module if browser is ie11, e.g:
 *
 *   const ua = window.navigator.userAgent;
 *   if(/Trident/.test(ua) && ua.indexOf('rv:')) {
 *     import('./utils/ie11-polyfill');
 *   }
 *
 * code pulled from:
 * https://github.com/d4tocchini/customevent-polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
 * https://github.com/webcomponents/webcomponentsjs/blob/v0.7.12/CustomElements.js#L950
 * https://github.com/webcomponents/webcomponents-platform/blob/master/webcomponents-platform.js
 * http://stackoverflow.com/questions/28815845/mouseevent-not-working-in-internet-explorer
 * http://stackoverflow.com/questions/26596123/internet-explorer-9-10-11-event-constructor-doesnt-work
 */


// Event constructor shim
const origEvent = window.Event;

// eslint-disable-next-line func-names
window.Event = function (inType, params = { bubbles: false, cancelable: false }) {
  const e = document.createEvent('Event');
  e.initEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable));
  return e;
};
if (origEvent) {
  // eslint-disable-next-line
  for (let i in origEvent) {
    window.Event[i] = origEvent[i];
  }
}
window.Event.prototype = origEvent.prototype;


// defaultPrevented is broken in IE.
// https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
const originalPreventDefault = Event.prototype.preventDefault;

// eslint-disable-next-line func-names
Event.prototype.preventDefault = function () {
  if (!this.cancelable) {
    return;
  }
  originalPreventDefault.call(this);
  Object.defineProperty(this, 'defaultPrevented', {
    // eslint-disable-next-line func-names
    get: function () {
      return true;
    },
    configurable: true
  });
};

// CustomEvent constructor shim
// eslint-disable-next-line func-names
window.CustomEvent = function (inType, params = { bubbles: false, cancelable: false, detail: null }) {
  const ce = document.createEvent('CustomEvent');
  ce.initCustomEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable), params.detail);
  return ce;
};
window.CustomEvent.prototype = window.Event.prototype;


// Mouse event shim
const origMouseEvent = window.MouseEvent;

// eslint-disable-next-line func-names
window.MouseEvent = function (inType, params) {
  params = params || {}; // eslint-disable-line no-param-reassign
  const e = document.createEvent('MouseEvent');
  e.initMouseEvent(inType,
    Boolean(params.bubbles), Boolean(params.cancelable),
    params.view || window, params.detail,
    params.screenX, params.screenY, params.clientX, params.clientY,
    params.ctrlKey, params.altKey, params.shiftKey, params.metaKey,
    params.button, params.relatedTarget);
  return e;
};

if (origMouseEvent) {
  // eslint-disable-next-line
  for (let i in origMouseEvent) {
    window.MouseEvent[i] = origMouseEvent[i];
  }
}
window.MouseEvent.prototype = origMouseEvent.prototype;
