/**
 * Generates a random string with a given length
 * @param n {Integer} length of generated string
 * @see http://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 * @return {String} the random string
 * @example
 * // Returns e.g. 'pd781w0y'
 * randomString(8);
 * @example see the tests for more examples
 */
const randomString = ( n=12 ) =>
  Array( n+1 ).join((`${Math.random().toString(36)}00000000000000000`).slice(2, 18)).slice(0, n);

export default randomString;
