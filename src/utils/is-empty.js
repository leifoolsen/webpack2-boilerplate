/**
 * Check whether a value is empty
 *
 * @param val the value to check
 * @return true if val is empty, otherwise false
 */

const isIterable = val =>
  Symbol && 'iterator' in Symbol && 'function' === typeof val[Symbol.iterator];

const isEmpty = val => {
  if(val == null || typeof val === 'undefined') {
    return true;
  }

  if(typeof val === 'string') {
    return val.trim().length < 1;
  }

  if(Array.isArray(val)) {
    return val.length < 1;
  }

  if(isIterable(val)) {
    return val.size < 1;
  }

  if(typeof val === 'object') {
    return !Object.keys(val).length;
  }

  return false;
};

export default isEmpty;
