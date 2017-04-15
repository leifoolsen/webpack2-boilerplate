import isObject from './is-object';

/**
 * Check whether a value is a DOM Element
 * @param val The value to check
 * @return true if val is a DOM Element, otherwise false
 * @see http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
 */
const isElement = val => isObject(val) && val instanceof HTMLElement;
export default isElement;
