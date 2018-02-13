/**
 * @see https://hackernoon.com/hot-reload-all-the-things-ec0fed8ab0
 * @see https://hackernoon.com/creating-a-structured-hot-reloadable-graphql-api-with-express-js-de62c859643
 * @see https://github.com/ericclemmons/webpack-hot-server-example
 */

import http from 'http';
import app from './api-app';
import config from '../config';
import logger from './logger/logger';

const server = http.createServer(app);
let currentApp = app;

const start = (done = () => {}) => {
  const {host, port} = config.apiServer;

  server.listen(port, host, (err) => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
    else {
      logger.info(`✅ API server stared @ http://${host}:${port}`);
      done(server);
    }
  });
};

if (module.hot) {
  module.hot.accept('./api-app', () => {
    logger.info('🔁 HMR Reloading...'); //eslint-disable-line no-console

    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });

  start(() => {
    logger.info('✅ Server-side HMR Enabled!'); //eslint-disable-line no-console
  });
}
else {
  logger.info('❌ Server-side HMR Not Enabled!'); //eslint-disable-line no-console
}

export {start};
