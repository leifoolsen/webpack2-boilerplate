/**
 * Check whether a value is numeric
 *
 * @param val the value to check
 * @return true if val is an object, otherwise false
 * @see http://reactivex.io/rxjs/file/es6/util/isNumeric.js.html
 */
const isNumeric = val =>
  // parseFloat NaNs numeric-cast false positives (null|true|false|"")
  // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
  // subtraction forces infinities to NaN
  // adding 1 corrects loss of precision from parseFloat (#15100)
  !Array.isArray(val) && ((val - parseFloat(val)) + 1) >= 0;

export default isNumeric;
