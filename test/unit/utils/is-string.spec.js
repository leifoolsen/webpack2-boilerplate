/* eslint-disable no-unused-expressions */

import { describe, it } from 'mocha';
import { expect } from 'chai';
import isString from '../../../src/utils/is-string';

describe('isstring', () => {

  it('should return true if value is a string', () => {
    expect(isString('ABC')).to.equal(true);
    expect(isString(new String('def'))).to.equal(true);
  });

  it('should return false if value is not a string', () => {
    expect(isString(['foo'])).to.equal(false);
    expect(isString(function () {})).to.equal(false);
    expect(isString(101)).to.equal(false);
    expect(isString({})).to.equal(false);
    expect(isString(/re/)).to.equal(false);
    expect(isString(true)).to.equal(false);
    expect(isString(null)).to.equal(false);
    expect(isString(undefined)).to.equal(false);
    expect(isString(new Number(101))).to.equal(false);
  });

});
