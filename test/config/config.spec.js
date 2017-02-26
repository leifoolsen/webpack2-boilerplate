import requireUncached from 'require-uncached';
import { beforeEach, afterEach, describe, it } from 'mocha';
import { assert, expect } from 'chai';
import deepMerge from '../../src/utils/deep-merge';

describe('config', () => {
  let nodeEnv;

  beforeEach(() => {
    nodeEnv = process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env.NODE_ENV = nodeEnv;
  });

  it('should have config.env: test when running tests', () => {
    const config = requireUncached('../../src/config');
    expect(config.env).to.equal('test');
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

  it('should have config.env: production when process.env.NODE_ENV is undefined', () => {
    process.env.NODE_ENV = undefined;
    const config = requireUncached('../../src/config');
    assert.isDefined(config);
    expect(config.env).to.equal('production');
  });

  it('should have config.env: production when process.env.NODE_ENV not in [test, development, production]', () => {
    process.env.NODE_ENV = 'foo';
    const config = requireUncached('../../src/config');
    expect(config.env).to.equal('production');
  });

  it('should merge default and production settings correctly', () => {
    // Note: This only tests merging of two imaginary config objects,
    // not the actual config

    const defaultConfig = {
      env: 'development',
      publicPath: '/',
      logger: {
        console: {
          level: 7,
        },
        remote: {
          level: 3,
          batchSize: 1,
          url: '/api/log',
        }
      },
    };

    const productionConfig = {
      env: 'production',
      logger: {
        console: {
          level: 6,
        },
        remote: {
          level: 3,
        }
      }
    };

    const expected = {
      env: 'production',
      publicPath: '/',
      logger: {
        console: {
          level: 6
        },
        remote: {
          level: 3,
          batchSize: 1,
          url: '/api/log'
        }
      }
    };

    const mergedConfig = deepMerge(defaultConfig, productionConfig);
    assert.deepEqual(mergedConfig, expected);
  });

});
