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

// eslint-disable-next-line prefer-template
const toURL = (scheme, host, port = '') => `${scheme}://${host}${port ? ':'+port : ''}`;

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
  .file( nodeEnv, { file: path.resolve(process.cwd(), 'config', `config.${nodeEnv}.json`) })
  .file( 'default', { file: path.resolve(process.cwd(), 'config', 'config.default.json') })
  .load();

// isDev and isProd should not be true at the same time
const isTest = nodeEnv === ENV.test;
const isDev = nodeEnv === ENV.development || (isTest && !nconf.get('env:prod'));
const isProd = nodeEnv === ENV.production || (isTest && nconf.get('env:prod')) || false;
const isHot = (nodeEnv === ENV.development && nconf.get('hot')) || false;
const logger = nconf.get('logger');

const server = nconf.get('server');
server.contentBase = path.resolve(process.cwd(), server.contentBase);
server.url = toURL('http', server.host, server.port);
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

//
// proxy breakdown
// see: https://github.com/chimurai/http-proxy-middleware
// see: https://webpack.js.org/configuration/dev-server/#devserver-proxy
//
// proxy: {
//   "/api": "http://localhost:3000"
// }
//
// proxy: {
//   "/api": {
//     target: "http://localhost:3000"
//     ...rest
//   }
// }
//
// proxy: [{
//   context: ["/auth", "/api"],
//   target: "http://localhost:3000",
//   ...rest
// }]
//
// transforms to
//
// proxy: {
//   context: "/api",
//   options: {
//     target: "http://localhost:3000"
//     ...rest
//   }
// }
//
// or
//
// proxy: [
//   {
//     context: ["/auth", "/api"],
//     options: {
//       target: "http://localhost:3000"
//       ...rest
//     }
//   }
// ]

const normalizeProxyConfig = config => {
  let context = Object.keys(config)[0];       // e.g. "/api" or 'context'
  const val = config[Object.keys(config)[0]]; // e.g. "http://localhost:3000"  or ["/auth", "/api"] or an object
  let options = {};

  if (context === 'context') {
    context = val;
    Object.keys(config).forEach((key, index) => {
      if (index > 0) {
        options[key] = config[key];
      }
    });
  }
  else {
    options = (typeof val === 'string' || val instanceof String)
      ? { target: val }
      : val;
  }

  return {
    context: context,
    options: options
  };
};

const useProxy = nconf.get('proxy') || false;
const proxyConfig = server.proxy;
let _proxy = null;

if (proxyConfig) {
  if (Array.isArray(proxyConfig)) {
    _proxy = [];
    proxyConfig.forEach( p => {
      _proxy.push(normalizeProxyConfig(p));
    });
  }
  else {
    _proxy = normalizeProxyConfig(proxyConfig);
  }
}

const proxy = useProxy ? _proxy : null;

const apiServer = nconf.get('apiServer');

export default Object.freeze({
  isTest,
  isDev,
  isProd,
  isHot,
  server,
  proxy,
  apiServer,
  logger,
});
