/**
 * Simple is object check.
 * @param x the object to check
 * @return true if x is an object, otherwise false
 * @see  http://reactivex.io/rxjs/file/es6/util/isObject.js.html
 */
const isObject = x => x != null && typeof x === 'object';
export default isObject;
