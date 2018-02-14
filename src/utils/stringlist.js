/**
 * A javascript utility for conditionally creating a list of strings.
 * The function takes any number of arguments which can be a string or object.
 * Inspired by (but not copied from) JedWatson/classnames, https://github.com/JedWatson/classnames
 *
 * @param  {*} args the strings and/or objects to
 * @return {Array} a list of strings
 * @example
 * // Returns ['foo', 'bar', 'baz', 'quux']
 * stringList(', ', 'foo', { bar: true, duck: false }, 'baz', { quux: true });
 * @example see the tests for more examples
 */
const stringlist = (...args) => {

  const isString = (str) => str != null && typeof str === 'string';

  const flatten = (list) => list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

  const objectToStrings = (arg) =>
    Object.keys(arg)
      .filter((key) => arg[key])
      .map((key) => key);

  return args
    .filter((arg) => !!arg)
    .map((arg) => isString(arg) ? arg : objectToStrings(arg))
    .reduce((result, arg) => result.concat(Array.isArray(arg) ? flatten(arg) : arg), []);
};

export default stringlist;
