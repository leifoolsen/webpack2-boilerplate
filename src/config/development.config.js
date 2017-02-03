import { LOG_LEVEL } from '../utils/logger';

const config = {
  env: 'development',
  logger: {
    console: {
      level: LOG_LEVEL.debug,
    },
    remote: {
      level: LOG_LEVEL.error,
    }
  },
};

module.exports = config;