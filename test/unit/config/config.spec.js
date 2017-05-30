/* eslint-disable no-unused-expressions */

const importFresh = require('import-fresh');
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

  it('should have config test', (done) => {
    process.env.NODE_ENV = 'test';
    const config = importFresh('../../../src/config/config').default;
    expect(config.env).to.equal('test');
    done();
  });

  it('should have config development', (done) => {
    process.env.NODE_ENV = 'development';
    const config = importFresh('../../../src/config/config').default;
    expect(config.env).to.equal('development');
    done();
  });

  it('should have config production', (done) => {
    process.env.NODE_ENV = 'production';
    const config = importFresh('../../../src/config/config').default;
    expect(config.env).to.equal('production');
    done();
  });
});
