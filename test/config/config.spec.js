import requireUncached from 'require-uncached';
import { beforeEach, afterEach, describe, it } from 'mocha';
import { assert, expect } from 'chai';

describe('config', () => {
  let nodeEnv;

  beforeEach(() => {
    nodeEnv = process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env.NODE_ENV = nodeEnv;
  });

  it('should have config.env: development in test', () => {
    const config = requireUncached('../../src/config');
    expect(config.env).to.equal('development');
  });

  it('should have config.env: production when process.env.NODE_ENV=production', () => {
    process.env.NODE_ENV = 'production';
    const config = requireUncached('../../src/config');
    expect(config.env).to.equal('production');
  });

  it('shoould have config.env: development when process.env.NODE_ENV=development', () => {
    process.env.NODE_ENV = 'development';
    const config = requireUncached('../../src/config');
    expect(config.env).to.equal('development');
  });

  it('should have config.env: development when process.env.NODE_ENV is undefined', () => {
    process.env.NODE_ENV = undefined;
    const config = requireUncached('../../src/config');
    assert.isUndefined(config);
  });
});