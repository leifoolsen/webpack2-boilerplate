import 'core-js/es6/promise';
import chalk from 'chalk';
import config from '../config';
import logger from './logger/logger';
import parseURI from './utils/parse-uri';
import app, { devMiddleware } from './app';
import infoServerStarted from './info-server-started';

const devMiddlewareCheck = (done) => {
  if (devMiddleware) {
    // Wait for devMiddleware to finish before starting server
    devMiddleware.waitUntilValid(() => {
      logger.debug('webpack is in a valid state ' + `${chalk.green('✓')}`);
      done();
    });
  }
  else {
    done();
  }
};

const pingProxy = (target) => {
  const ping = require('node-http-ping'); // eslint-disable-line global-require
  const uri = parseURI(target);

  ping(uri.host, uri.port)
    .then(time => {
      logger.debug(`Proxy: ${uri.authority}. Response time: ${time}ms`);
    })
    .catch(error => {
      logger.error(`Could not connect to: ${target}. Error: ${error}\n` +
        'Try to restart the proxy server');
      process.exit(1);
    });
};

const proxyCheck = () => {

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
};



// Server handle
let handle = null;

const startServer = (done) => {

  if (handle === null) {
    // Start server
    const {host, port} = config.server;

    handle = app.listen(port, host, (err) => {
      if (err) {
        logger.error(err);
        process.exit(1);
      }
      else {
        infoServerStarted();
        done();
      }
    });
  }
  else {
    done();
  }
};

const server = {

  get app() { return app; },

  get handle() { return handle; },

  start: (done = () => {}) => {
    // Integration tests should wait for
    // the callback before running tests.
    devMiddlewareCheck(() => {
      proxyCheck();
      startServer(done);
    });
  },

  stop: (done = () => {}) => {
    // Integration tests should stop the server
    // after tests are completed
    if (handle) {
      handle.close((err) => {
        handle = null;
        logger.info('Server stopped', err ? err : '');
        done();
      });
    }
    else {
      done();
    }
  },
};

export default server;
