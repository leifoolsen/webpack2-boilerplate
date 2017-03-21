import isObject from './is-object';

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

const deepMerge = (target = {}, ...sources) => {

  const result = Object.assign({}, target);

  for (let i = 0; i < sources.length; i++) {

    const source = sources[i];
    if (source) {
      Object.keys(source).forEach(key => {

        if (isObject(source[key])) {

          if (!(key in result)) {
            Object.assign(result, { [key]: source[key] });
          }
          else {
            result[key] = deepMerge(result[key], source[key]);
          }
        }
        else {
          Object.assign(result, { [key]: source[key] });
        }
      });
    }
  }
  return result;
};

export default deepMerge;
