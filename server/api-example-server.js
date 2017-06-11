import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import logger from './logger';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/ping', (req, res) => res.type('json').json( {ping: 'proxy pong!'} ));

const apiServer = {
  app: app,
  handle: null,

  start: () => {
    const startServer = () => {
      if (apiServer.handle === null) {
        apiServer.handle = apiServer.app.listen(8010, 'localhost', (err) => {
          if (err) {
            logger.error(err.message);
            process.exit(1);
          }
          else {
            apiServer.app.emit('serverStarted');
            logger.log('API server stared @ port: 8010');
          }
        });
      }
    };

    startServer();
  },

  stop: (done = () => {}) => {
    if (apiServer.handle !== null) {
      apiServer.handle.close(done);
      apiServer.handle = null;
      logger.log('API server stopped');
    }
  },
};


// Export for test
export default apiServer;
