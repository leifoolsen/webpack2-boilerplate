import { describe, it } from 'mocha';
import { expect } from 'chai';
import isObject from '../../src/utils/is-Object';

describe('is-object', () => {

  it('should return true if value is an object', () => {
    expect(isObject([])).to.be.true;
    expect(isObject({})).to.be.true;
    expect(isObject({ a: 1 })).to.be.true;

  });

  it('should return false if value is not an object', () => {
    expect(isObject(true)).to.be.false;
    expect(isObject(1)).to.be.false;
    expect(isObject('A123.4')).to.be.false;
  });

});
