import chalk from 'chalk';
import config from '../config';
import logger from './logger';
import app, { devMiddleware } from './app';
import infoServerStarted from './info-server-started';

const parseURL = url => {
  // See: https://stackoverflow.com/questions/6168260/how-to-parse-a-url
  const pattern = new RegExp('^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?');
  const matches = url.match(pattern);
  const [ host, port = '' ] = matches[4].split(':'); // authority, e.g. localhost:80

  return {
    scheme: matches[2],
    host: host,
    port: port,
    path: matches[5],
    query: matches[7],
    fragment: matches[9]
  };
};

const pingProxy = (target) => {
  const ping = require('node-http-ping'); // eslint-disable-line global-require
  const url = parseURL(target);

  ping(url.host, url.port)
    .then(time => logger.debug(`Proxy response time: ${time}ms`))
    .catch(error => {
      logger.error(`Could not connect to: ${target}. Error: ${error}\n` +
        'Try to restart the proxy server');
      process.exit(1);
    });
};


// Server handle
let handle = null;

const startServer = () => {
  if(config.proxy) {
    if (Array.isArray(config.proxy)) {
      config.proxy.forEach( p => {
        pingProxy(p.options.target);
      });
    }
    else {
      pingProxy(config.proxy.options.target);
    }
  }

  if (handle === null) {
    const {host, port} = config.server;

    handle = app.listen(port, host, (err) => {
      if (err) {
        logger.error(err);
        process.exit(1);
      }
      else {
        infoServerStarted();
      }
    });
  }
  // In integration tests we'll wait for the
  // serverStarted event to fire before running tests.
  app.emit('serverStarted');
};

const server = {

  get app() { return app; },

  get handle() { return handle; },

  start: () => {
    // Server should wait for devMiddleware to finish before starting
    if (devMiddleware) {
      devMiddleware.waitUntilValid(() => {
        logger.debug('webpack is in a valid state ' + `${chalk.green('✓')}`);
        startServer();
      });
    }
    else {
      startServer();
    }
  },

  stop: (done = () => {}) => {
    // Integration tests can stop the server
    // after a test suite is completed
    if (handle) {
      handle.close(done);
      handle = null;
      logger.info('Server stopped');
    }
  },
};

export default server;
