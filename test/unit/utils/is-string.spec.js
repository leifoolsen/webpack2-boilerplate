/* eslint-disable no-unused-expressions */

import { describe, it } from 'mocha';
import { expect } from 'chai';
import isString from '../../../src/utils/is-string';

describe('isstring', () => {

  it('should return true if value is a string', () => {
    expect(isString('ABC')).to.be.true;
    expect(isString(new String('def'))).to.be.true;
  });

  it('should return false if value is not a string', () => {
    expect(isString(['foo'])).to.be.false;
    expect(isString(function () {})).to.be.false;
    expect(isString(101)).to.be.false;
    expect(isString({})).to.be.false;
    expect(isString(/re/)).to.be.false;
    expect(isString(true)).to.be.false;
    expect(isString(null)).to.be.false;
    expect(isString(undefined)).to.be.false;
    expect(isString(new Number(101))).to.be.false;
  });

});
