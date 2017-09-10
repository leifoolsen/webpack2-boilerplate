/**
 * Check whether a value is empty
 *
 * @param {*} val the value to check
 * @return {boolean} true if val is empty, otherwise false
 * @throws {ReferenceError} if val is a WeakMap
 * @throws {ReferenceError} if val is a WeakSet
 *
 * @example
 *
 * // returns true
 * isEmpty()
 *
 * // returns true
 * isEmpty(null)
 *
 * // returns true
 * isEmpty('')
 *
 * // returns true
 * isEmpty('     ')
 *
 * // returns false
 * isEmpty('foo')
 *
 * // returns false
 * isEmpty(true)
 *
 * // returns false
 * isEmpty(false)
 *
 * // returns false
 * isEmpty(1)
 *
 * // returns false
 * isEmpty(Number(-1))
 *
 * // returns true
 * isEmpty([])
 *
 * // returns false
 * isEmpty([1, 2, 3])
 *
 * // returns true
 * isEmpty({})
 *
 * // returns false
 * isEmpty({ 'a': 1 })
 *
 * // throws ReferenceError
 * isEmpty(new WeakSet())
 *
 * // throws ReferenceError
 * isEmpty(new WeakMap())
 */

const isIterable = val =>
  Symbol && 'iterator' in Symbol && typeof val[Symbol.iterator] === 'function';

const isWeakMap = val => `${WeakMap}` === `${val.constructor}`;

const isWeakSet = val => `${WeakSet}` === `${val.constructor}`;

const isEmpty = val => {

  if (val == null || typeof val === 'undefined') {
    return true;
  }

  if (typeof val === 'string') {
    return !val.trim().length;
  }

  if (Array.isArray(val)) {
    return !val.length;
  }

  if (isIterable(val)) {
    return !val.size;
  }

  if (typeof val === 'object') {

    if (isWeakMap(val)) {
      throw new ReferenceError('Can not determine if WeakMap is empty');
    }

    if (isWeakSet(val)) {
      throw new ReferenceError('Can not determine if WeakSet is empty');
    }

    return !Object.keys(val).length;
  }

  return false;
};

export default isEmpty;
