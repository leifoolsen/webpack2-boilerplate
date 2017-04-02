/*
 * Code pulled from:
 * https://github.com/jonathantneal/closest/blob/master/closest.js
 * https://plainjs.com/javascript/traversing/get-closest-element-by-selector-39/
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
 * http://stackoverflow.com/questions/18663941/finding-closest-element-without-jquery
 */

/**
 * Element.matches() polyfill
 * The Element.matches() method returns true if the element would be selected by the specified selector string;
 * otherwise, returns false.
 */
if (typeof Element.prototype.matches !== 'function') {
  Element.prototype.matches = Element.prototype.msMatchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||

    function matches(selector) {
      const element = this;
      const elements = (element.document || element.ownerDocument).querySelectorAll(selector);
      let i = elements.length;
      while (--i >= 0 && elements.item(i) !== element);
      return i > -1;
    };
}

/**
 * Element.closest() polyfill
 * The Element.closest() method returns the closest ancestor of the current element (or the current element itself)
 * which matches the selectors given in parameter. If there isn't such an ancestor, it returns null.
 */
if (typeof Element.prototype.closest !== 'function') {
  Element.prototype.closest = function closest(selector) {
    let element = this;

    while (element && element.nodeType === Node.ELEMENT_NODE) {
      if (element.matches(selector)) {
        return element;
      }
      element = element.parentNode;
    }
    return null;
  };
}
