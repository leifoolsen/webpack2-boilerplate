/**
 * Build a configuration object for a given environment,
 * e.g.'development', 'production', 'test'
 * @author Leif Olsen
 */

import isObject from '../utils/is-object';
import deepMerge from '../utils/deep-merge';
import { LOG_LEVEL } from '../logger/logger';

const cfg = {
  server: {
    config: {
      host: 'localhost',
      port: 8082,
      publicPath: '/',
      apiPath: '/api',
    },
    development: {
      port: 8084,
    },
    production: {
      port: 8000,
    },
    test: {
    },
  },
  proxyServer: {
    config: {
      host: 'localhost',
      port: 8010,
      path: '/api',
    },
  },
  logger: {
    config: {
      console: {
        level: LOG_LEVEL.debug,
      },
      remote: {
        level: LOG_LEVEL.error,
        batchSize: 1,
        url: '/api/log',
      },
    },
    production: {
      console: {
        level: LOG_LEVEL.info,
      },
    },
    test: {
      remote: {
        level: LOG_LEVEL.silent,
      },
    },
  },
};

/**
 * Builds a configuration object for a given environment,
 * e.g.'development', 'production', 'test'
 * @param env the config environment
 * @returns {{}} a configuration object for the given environment
 *
 * @example
 * // Given
 * {
 *   server: {
 *     config: {
 *       port: 8086
 *     },
 *     production: {
 *       port: 8080
 *     },
 *     test: {
 *       port: 8088
 *     },
 *   }
 * }
 *
 * const c = config('test')
 * // Rerurns { env: 'test', server: { port: 8088 } }
 *
 */
const configBuilder = env => {
  const result = { env: env };
  Object.keys(cfg).forEach(key => {
    if (isObject(cfg[key])) {
      const a = cfg[key].config;
      const b = cfg[key][env];
      result[key] = deepMerge(a, b);
    }
  });
  return result;
};

export default configBuilder;
