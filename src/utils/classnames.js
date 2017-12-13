import stringlist from './stringlist';

/**
 * A simple javascript utility for conditionally joining strings together.
 * The function takes a delimiter string and any number of arguments which can be a string or object.
 *
 * @param  {*} args the strings and/or objects to join
 * @return {String} the joined strings
 * @example
 * // Returns 'foo bar baz quux'
 * classnames('foo', { bar: true, duck: false }, 'baz', { quux: true });
 * @example see the tests for more examples
 */
const classnames = (...args) => stringlist(...args).join(' ');

export default classnames;
