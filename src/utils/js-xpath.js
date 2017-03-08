/**
 * Access JavaScript objects using XPath
 * @author Leif Olsen
 */

import isNumeric from './is-numeric';
import isObject from './is-object';

/**
 * Wrap a key
 * @param key
 * @returns {String} The key wrapped in brackets if the key is numeric,
 *                   otherwise the key is prefixed with a '/'
 */
const wrapKey = key => isNumeric(key) ? `[${parseInt(key, 10) + 1}]` : `/${key}`;

/**
 * Split a key int two parts if the key contains brackets
 * @param key
 * @returns {Array} the split key
 */
const splitKey = key => key.split(/[[\]]{1,2}/); // 'a[1]' => ['a', 1], 'a' => ['a', undefined]

/**
 * Convert an object to a list of XPath expressions
 *
 * @param   {Object} object The object to be converted
 * @returns {Object}        The resulting XPath key value list
 * @see https://gist.github.com/penguinboy/762197
 * @see http://stackoverflow.com/questions/6393943/convert-javascript-string-in-dot-notation-into-an-object-reference
 */
const o2XPath = object => {
  // eslint-disable-next-line wrap-iife
  return Object.assign({}, ...function _flatten(objectBit, path = '') {  // spread the result into our return object
    return [].concat(                                                    // concat everything into one level
      ...Object.keys(objectBit).map(                                     // iterate over object
        key => isObject(objectBit[key])                                  // check if there is a nested object
          ? _flatten(objectBit[key], `${path}${wrapKey(key)}`)           // call itself if there is
          : ({ [`${path}/${key}`]: objectBit[key] })                     // append object with it’s path as key
      )
    );
  }(object));
};

const JsXPath = {

  /**
   * Transforms object(s) to a list of key value pairs
   *
   * @param args - The object(s) to transform
   * @returns {Object | Array} The resulting transformed object or an array of
   *                           transformed objects if the args array contains
   *                           more than one object
   *
   * @example
   *
   *  const foo = {
   *    a: 1,
   *    b: 'b',
   *    bars: [
   *      {
   *        bar: {
   *          c: 3,
   *          d: 'd'
   *        },
   *      },
   *      {
   *        bar: {
   *          c: 5,
   *          d: 'f',
   *          baz: {
   *            x: 24
   *          }
   *        }
   *      }
   *    ],
   *    buz: {
   *      y: 25,
   *      z: 'z'
   *    }
   *  };
   *
   * objectToXPath(foo); // Returns
   * {
   *   '/a': 1,
   *   '/b': 'b',
   *   '/bars[1]/bar/c': 3,
   *   '/bars[1]bar/d': 'd',
   *   '/bars[2]/bar/c': 5,
   *   '/bars[2]/bar/d': 'f',
   *   '/bars[2]/bar/baz/x': 24,
   *   '/buz/y': 25,
   *   '/buz/z': 'z' *
   * }
   *
   * @example
   * const bar = { a: 1, b: 'b' };
   *
   * objectToXPath( bar ); // Returns
   * {
   *   '/a': 1,
   *   '/b': 'b'
   * }
   *
   * objectToXPath( {bar} ); // Returns
   * {
   *   '/bar/a': 1,
   *   '/bar/b': 'b'
   * }
   *
   * @example
   * const bar = { a: 1, b: 'b' };
   * const buz = { y: 25, z: 'z' };
   *
   * objectToXPath( bar, buz ); // Returns
   * [
   *   {
   *     '/a': 1,
   *     '/b': 'b'
   *   }, {
   *     '/y': 25,
   *     '/z': 'z'
   *   }
   * ]
   *
   * objectToXPath( {bar}, {buz} ); // Returns
   * [
   *   {
   *     '/bar/a': 1,
   *     '/bar/b': 'b'
   *   }, {
   *     '/buz/y': 25,
   *     '/buz/z': 'z'
   *   }
   * ]
   *
   * objectToXPath( {bar, buz} ); // Returns
   * {
   *   '/bar/a': 1,
   *   '/bar/b': 'b',
   *   '/buz/y': 25,
   *   '/buz/z': 'z'
   * }
   *
   * objectToXPath( {...bar, ...buz} ); // Returns
   * {
   *   '/a': 1,
   *   '/b': 'b',
   *   '/y': 25,
   *   '/z': 'z'
   * }
   */
  objectToXPath: (...args) => {
    let result;
    if (args.length === 1) {
      result = o2XPath(args[0]);
    }
    else {
      result = [];
      for (let i = 0; i < args.length; i++) {
        result.push(o2XPath(args[i]));
      }
    }
    return result;
  },

  /**
   * Get the value for a given XPath expression
   * @param {Object} obj   The object to get the value from
   * @param {String} xPath The XPath expression
   * @return {*}
   * @throws {TypeError} if xPath is invalid
   */
  getValue: (obj, xPath) => {
    return xPath
      .split('/')
      .filter(key => !!key)
      .reduce((result, key) => {
        const [k, i] = splitKey(key); // '/a[0]' => ['a', 0], '/a' => ['a', undefined]
        return i !== undefined ? result[k][i - 1] : result[k];
      }, obj);
  },

  /**
   * Set value for a given XPath expression where the path is a valid (existing) path
   * This function will NOT create intermediate objects/arrays for non existing
   * paths. Use JavaScript to add/remove elements.
   *
   * @param {Object} obj   The object to set the value for
   * @param {String} xPath The XPath expression
   * @param {*} value      The value to set
   * @return {void}
   * @throws {TypeError} if xPath is invalid
   */
  setValue: (obj, xPath, value) => {
    const keys = xPath.split('/').filter(key => !!key);
    const last = keys.pop();

    const rest = keys.reduce((result, key) => {
      const [k, i] = splitKey(key); // '/a[0]' => ['a', 0], '/a' => ['a', undefined]
      return i !== undefined ? result[k][i - 1] : result[k];
    }, obj);

    const [k, i] = splitKey(last);
    if (i) {
      rest[k][i - 1] = value;
    }
    else {
      rest[k] = value;
    }
  },

  /**
   * Check whether a path exist
   * @param {Object} obj   The object to check
   * @param {String} xPath The XPath expression
   * @return {boolean}
   */
  pathExists: (obj, xPath) => {
    try {
      return JsXPath.getValue(obj, xPath) !== undefined;
    }
    catch (TypeError) {
      return false;
    }
  }

};

Object.freeze(JsXPath);
export default JsXPath;
