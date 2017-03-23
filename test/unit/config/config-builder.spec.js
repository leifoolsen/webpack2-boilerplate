import { describe, it } from 'mocha';
import { assert } from 'chai';
import { LOG_LEVEL } from '../../../src/logger/logger';
import configBuilder from '../../../src/config/config-builder';

const expectedConfigTest = {
  env: 'test',
  server: {
    host: 'localhost',
    port: 8082,
    publicPath: '/',
    apiPath: '/api',
  },
  proxyServer: {
    host: 'localhost',
    port: 8090,
    user: 'any',
    apiPath: '/api',
  },
  logger: {
    console: {
      level: LOG_LEVEL.debug,
    },
    remote: {
      level: LOG_LEVEL.silent,
      batchSize: 1,
      url: '/api/log',
    },
  },
};

const expectedConfigDev = {
  env: 'development',
  server: {
    host: 'localhost',
    port: 8084,
    publicPath: '/',
    apiPath: '/api',
  },
  proxyServer: {
    host: 'localhost',
    port: 8090,
    user: 'any',
    apiPath: '/api',
  },
  logger: {
    console: {
      level: LOG_LEVEL.debug,
    },
    remote: {
      level: LOG_LEVEL.error,
      batchSize: 1,
      url: '/api/log',
    },
  },
};

const expectedConfigProd = {
  env: 'production',
  server: {
    host: 'localhost',
    port: 8000,
    publicPath: '/',
    apiPath: '/api',
  },
  proxyServer: {
    host: 'localhost',
    port: 8090,
    user: 'any',
    apiPath: '/api',
  },
  logger: {
    console: {
      level: LOG_LEVEL.info,
    },
    remote: {
      level: LOG_LEVEL.error,
      batchSize: 1,
      url: '/api/log',
    },
  },
};

describe('config-builder', () => {
  it('should build config for test', () => {
    const cfg = configBuilder('test');
    assert.deepEqual(cfg, expectedConfigTest);
  });

  it('should build config for development', () => {
    const cfg = configBuilder('development');
    assert.deepEqual(cfg, expectedConfigDev);
  });

  it('should build config for production', () => {
    //eslint-disable-next-line global-require
    const cfg = require('../../../src/config/config-builder')('production');
    assert.deepEqual(cfg, expectedConfigProd);
  });
});
