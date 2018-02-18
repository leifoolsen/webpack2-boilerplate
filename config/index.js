process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/*
 * Shared configuration Express and Webpack
 *
 * NODE_ENV: 'test' || 'development' || 'production'
 *
 * argv (NODE_ENV flags):
 *   --hot
 *   --env.dev
 *   --env.prod
 *
 * NODE_ENV + argv flags combined:
 *   'test' + (env.dev || env.prod)
 *   'development' + ('' || hot)
 *   'production' + ''
 *
 * isDev  = NODE_ENV === 'development' || (NODE_ENV === 'test' && !env.prod);
 * isProd = NODE_ENV === 'production'  || (NODE_ENV === 'test' && env.prod);
 *
 * config.default.json + (config.test.json || config.development.json || config.production.json)
 *
 */

import path from 'path';

const ENV = {
  test: 'test',
  development: 'development',
  production: 'production'
};

const nodeEnv = process.env.NODE_ENV;

const nconf = require('nconf');

nconf
  .argv()
  .env()
  .file(nodeEnv, {file: path.resolve(process.cwd(), 'config', `config.${nodeEnv}.json`)})
  .file('default', {file: path.resolve(process.cwd(), 'config', 'config.default.json')})
  .load();

// isDev and isProd should not be true at the same time
const isTest = nodeEnv === ENV.test;
const isDev = nodeEnv === ENV.development || (isTest && !nconf.get('env:prod'));
const isProd = nodeEnv === ENV.production || (isTest && nconf.get('env:prod')) || false;
const isHot = (nodeEnv === ENV.development && nconf.get('hot')) || false;

// logger
const logger = nconf.get('logger');

// server
const server = nconf.get('server');
server.scheme = server.scheme || 'http';

if(!server.contentBase.startsWith('/')) {
  server.contentBase = path.resolve(process.cwd(), server.contentBase);
}

server.apiPath = server.apiPath || '/api';

if (!server.publicPath.endsWith('/')) {
  server.publicPath = path.join(server.publicPath, '/');
}

if (server.historyApiFallback) {
  if (!server.historyApiFallback.index) {
    server.historyApiFallback.index = '/index.html';
  }
  if (!server.historyApiFallback.index.startsWith(server.publicPath)) {
    server.historyApiFallback.index = path.join(server.publicPath, server.historyApiFallback.index);
  }
}

const useProxy = nconf.get('proxy') || false;
const apiServer = nconf.get('apiServer');
apiServer.scheme = apiServer.scheme || 'http';

export default Object.freeze({
  isTest,
  isDev,
  isProd,
  isHot,
  logger,
  server,
  useProxy,
  apiServer,
});
