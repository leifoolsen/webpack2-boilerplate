import { describe, it } from 'mocha';
import { expect } from 'chai';
import { argsToKeyValue } from '../../../src/utils/args-to-key-value';

describe('args-to-key-value', () => {

  it('should transforms an array of arguments to key value pairs', () => {

    const arrayToParse = [ '--env.dev', '--port', '8084', '--content-base', 'src' ];
    const expectedResult = {
      'env.dev': true,
      port: '8084',
      'content-base': 'src'
    };

    const result = argsToKeyValue(arrayToParse);
    expect(result).to.deep.equal(expectedResult);
  });
});
