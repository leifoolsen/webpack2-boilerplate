/* eslint-disable no-unused-expressions */

import requireUncached from 'require-uncached';

const before = require('mocha').before;
const after = require('mocha').after;
const describe = require('mocha').describe;
const it = require('mocha').it;
const expect = require('chai').expect;

describe('config', () => {
  let env;

  before(() => {
    env = process.env.NODE_ENV;
  });

  after(() => {
    process.env.NODE_ENV = env;
  });

  it('should have config test', () => {
    process.env.NODE_ENV = 'test';
    const config = requireUncached('../../../src/config/config');
    expect(config.env).to.equal('test');
  });

  it('should have config development', () => {
    process.env.NODE_ENV = 'development';
    const config = requireUncached('../../../src/config/config');
    expect(config.env).to.equal('development');
  });

  it('should have config production', () => {
    process.env.NODE_ENV = 'production';
    const config = requireUncached('../../../src/config/config');
    expect(config.env).to.equal('production');
  });
});
