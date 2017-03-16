/**
 * See: http://beletsky.net/2015/01/configuring-front-end-applications.html
 */

import { LOG_LEVEL } from '../logger/logger';
import deepMerge from '../utils/deep-merge';

// Note: The "process.env.NODE_ENV" and "process.env.PUBLIC_PATH" globals
// are injected by webpack during build using webpack.DefinePlugin.
const env = ['test', 'development', 'production']
    .find( el => el === process.env.NODE_ENV) || 'production';

const PUBLIC_PATH = '/';

const defaultConfig = {
  env: env,
  publicPath: PUBLIC_PATH,
  apiPath: `${PUBLIC_PATH}api`,
  logger: {
    console: {
      level: LOG_LEVEL.debug,
    },
    remote: {
      level: LOG_LEVEL.error,
      batchSize: 1,
      url: '/api/log',
    }
  },
  server: {
    port: 8082
  },
};


const config = {
  test: defaultConfig,
  development: defaultConfig,
  production: deepMerge(defaultConfig, require('./production.config')), // eslint-disable-line global-require
};

module.exports = config[env];
