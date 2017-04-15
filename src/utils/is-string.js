/**
 * Check whether a value is a string
 * @param val The value to check
 * @return true if val is a String, otherwise false
 */
const isString = val => typeof val === 'string' || val instanceof String;
export default isString;
