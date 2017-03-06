import { describe, it } from 'mocha';
import { expect } from 'chai';
import isNumeric from '../../src/utils/is-numeric';

describe('is-numeric', () => {

  it('should return true if value is a number', () => {
    expect(isNumeric(123)).to.be.true;   // eslint-disable-line no-unused-expressions
    expect(isNumeric('123')).to.be.true; // eslint-disable-line no-unused-expressions
    expect(isNumeric('123.4')).to.be.true; // eslint-disable-line no-unused-expressions
  });

  it('should return false if value is not a number', () => {
    expect(isNumeric('A123.4')).to.be.false; // eslint-disable-line no-unused-expressions
  });

});
