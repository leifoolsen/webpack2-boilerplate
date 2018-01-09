const describe = require('mocha').describe;
const it = require('mocha').it;
const expect = require('chai').expect;

import randomString from '../../../src/utils/random-string';

describe('#randomString', () => {
  it('returns a random string with a given length', () => {
    expect(randomString()).to.have.length(12);
  });
  it('generates two different strings', () => {
    expect(randomString(8)).to.not.equal(randomString(8));
  });
});
