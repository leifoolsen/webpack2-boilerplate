/*
 * Config singleton
 */

import configBuilder from './config-builder';
import logger from '../logger/logger';

const config = configBuilder(process.env.NODE_ENV);
config.server.publicPath = process.env.PUBLIC_PATH || config.server.publicPath;
config.server.apiPath = process.env.API_PATH || config.server.apiPath;

logger.consoleLogger.level = config.logger.console.level;
logger.remoteLogger.level = config.logger.remote.level;
logger.remoteLogger.batchSize = config.logger.remote.batchSize;
logger.remoteLogger.url = config.logger.remote.url;

export default config;

