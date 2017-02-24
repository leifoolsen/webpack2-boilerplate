import { LOG_LEVEL } from '../logger/logger';

const config = {
  env: 'production',
  logger: {
    console: {
      level: LOG_LEVEL.info,
    },
    remote: {
      level: LOG_LEVEL.error,
    }
  }
};

module.exports = config;
