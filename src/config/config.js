/*
 * Simple client configuration
 * Reads config data from a JSON file.
 * The JSON file can also be used with config libraries like 'nconf'
 */
import clientCfg from './client-config.json';
import configBuilder from './config-builder';
import logger from '../logger/logger';
import LOG_LEVEL from '../logger/log-level';

const _config = () => {

  // Build config
  const result = configBuilder(
    {
      // Config injected by webpack
      env: process.env.NODE_ENV,
      publicPath: process.env.PUBLIC_PATH,
      apiPath: process.env.API_PATH
    },
    clientCfg['default'],            // default config
    clientCfg[process.env.NODE_ENV]  // environment spesific config
  ).build();

  // Config client logger
  logger.consoleLogger.level = LOG_LEVEL[result.logger.console.level] || LOG_LEVEL.info;
  logger.remoteLogger.level = LOG_LEVEL[result.logger.remote.level] || LOG_LEVEL.silent;
  logger.remoteLogger.batchSize = result.logger.remote.batchSize || 1;
  logger.remoteLogger.url = result.logger.remote.url;

  return result;
};

const config = _config();

export default config;
