/**
 * Transforms an array to key value pairs
 * @param array the array to transform to an object of key value pairs
 * @example
 * arrayToKeyValue([ '--env.dev', '--port', '8084', '--content-base', 'src' ]);
 * // Returns { 'env.dev': undefined, port: '8084', 'content-base': 'src' }
 */
const arrayToKeyValue = array => {

  const isString = s => typeof s === 'string';

  const argToKey = arg => isString(arg) && arg.trim().startsWith('-') ? arg.trim().replace(/^[-]+/, '') : undefined;

  return array.reduce( (prev, current, index, arr) => {

    const key = argToKey(current);
    if(key) {
      let val = undefined;
      if (index < arr.length - 1) {
        val = arr[index + 1];
        if (isString(val) && !val.trim().startsWith('-')) {
          arr.splice(index, 1);
        }
        else {
          val = undefined;
        }
      }
      return {
        ...prev,
        [key]: val
      }
    }
    return prev;

  }, {});
};

exports.arrayToKeyValue = arrayToKeyValue;
