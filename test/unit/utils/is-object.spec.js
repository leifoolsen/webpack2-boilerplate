import { describe, it } from 'mocha';
import { expect } from 'chai';
import isObject from '../../../src/utils/is-object';

describe('is-object', () => {

  it('should return true if value is an object', () => {
    expect(isObject([])).to.be.true; // eslint-disable-line no-unused-expressions
    expect(isObject({})).to.be.true; // eslint-disable-line no-unused-expressions
    expect(isObject({ a: 1 })).to.be.true; // eslint-disable-line no-unused-expressions

  });

  it('should return false if value is not an object', () => {
    expect(isObject(true)).to.be.false; // eslint-disable-line no-unused-expressions
    expect(isObject(1)).to.be.false; // eslint-disable-line no-unused-expressions
    expect(isObject('A123.4')).to.be.false; // eslint-disable-line no-unused-expressions
  });

});
