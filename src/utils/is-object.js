/**
 * Simple is object check.
 * @param val the object to check
 * @return true if val is an object, otherwise false
 * @see  http://reactivex.io/rxjs/file/es6/util/isObject.js.html
 */
const isObject = val => val != null && typeof val === 'object';
export default isObject;
