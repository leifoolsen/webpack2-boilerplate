/**
 * Transforms an array of arguments to key value pairs
 * @param array the array to transform to an object of key value pairs
 * @example
 * arrayToKeyValue([ '--env.dev', '--port', '8084', '--content-base', 'src' ]);
 * // Returns { 'env.dev': true, port: '8084', 'content-base': 'src' }
 * @author Leif Olsen
 */
const argsToKeyValue = array => {

  //const isString = s => typeof s === 'string';

  const argToKey = arg => String(arg).trim().startsWith('-') ? arg.trim().replace(/^[-]+/, '') : false;

  return array.reduce( (prev, current, index, arr) => {

    const key = argToKey(current);
    if(key) {
      let val = true;
      if (index < arr.length - 1) {
        const n = String(arr[index + 1]).trim();
        if (!n.startsWith('-')) {
          val = arr[index + 1];
          arr.splice(index, 1);
        }
      }
      //return {
      //  ...prev,
      //  [key]: val
      //}
      return Object.assign({}, prev, {[key]: val});
    }
    return prev;

  }, {});
};

export default argsToKeyValue;

