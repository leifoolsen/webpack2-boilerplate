/* eslint-disable no-unused-expressions */

import {describe, it} from 'mocha';
import {expect} from 'chai';
import isNumeric from '../../../src/utils/is-numeric';

describe('is-numeric', () => {

  it('should return true if value is a number', () => {
    expect(isNumeric(123)).to.equal(true);
    expect(isNumeric('123')).to.equal(true);
    expect(isNumeric('123.4')).to.equal(true);
  });

  it('should return false if value is not a number', () => {
    expect(isNumeric('A123.4')).to.equal(false);
  });

});
