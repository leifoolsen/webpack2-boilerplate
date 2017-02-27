/*
 * Deep merge objects
 */

/**
 * Simple is object check.
 * @param x the object to check
 * @return true if x is an object, otherwise false
 * @see  http://reactivex.io/rxjs/file/es6/util/isObject.js.html
 */
const isObject = x => x != null && typeof x === 'object';

/**
 * Deep merge objects
 * Both Object.assign and Object spread only do a shallow merge.
 * @param {Object} target
 * @param {...Object} sources the objects to merge into terget
 * @return {Object} the merged object
 * @see http://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
 *
 * @example
 * // Given
 * const x = { a: { a: 1 } }
 * const y = { a: { b: 1 } }
 * const z = { ...x, ...y }
 * // Returns a shallow merge { a: { b: 1 } }
 * const m = deepMerge(x, y)
 * // Rerurns a deep merge { a: { a: 1, b: 1 } }
 */

const deepMerge = (target, ...sources) => {

  const result = Object.assign({}, target);

  if(sources.length > 0) {
    const source = sources.shift();

    // TODO: Rewite for-of loop
    //eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(source)) {
      if (isObject(source[key])) {
        if (!(key in result)) {
          Object.assign(result, {[key]: source[key]});
        }
        else {
          result[key] = deepMerge(result[key], source[key]);
        }
      }
      else {
        Object.assign(result, {[key]: source[key]});
      }
    }
    return deepMerge(result, ...sources);
  }
  return result;
};

export default deepMerge;
