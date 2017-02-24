/**
 * Se: http://beletsky.net/2015/01/configuring-front-end-applications.html
 */

import { LOG_LEVEL } from '../logger/logger';

const env = process.env.NODE_ENV || 'development';

const defaultConfig = {
  env: 'development',
  publicPath: '/',
  logger: {
    console: {
      level: LOG_LEVEL.debug,
    },
    remote: {
      level: LOG_LEVEL.error,
    }
  },
};


const config = {
  test: defaultConfig,
  development: defaultConfig,
  production: Object.assign({}, defaultConfig, require('./production.config')), // eslint-disable-line global-require
};

module.exports = config[env];
