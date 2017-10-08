// Sample REST API
import express from 'express';
import logger from './logger';
import { notFound } from './error-handlers';

const time = () => (new Date()).toISOString();

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => res.type('json').json({
  status: 200,
  message: '/api',
  time: time()
}));

apiRouter.get('/ping', (req, res) => res.type('json').json({
  status: 200,
  message: 'pong!',
  time: time()
}));

apiRouter.post('/log', (req, res) => {
  // Choose at strategy for logging.
  // Logging only to console to keep it simple in boilerplate
  const level = req.body.level || 'error';

  logger.log(level, JSON.stringify(req.body));

  res.status(200).send({
    status: 200,
    message: 'OK',
    time: time()
  });
});

// Catch 404 and forward to error handler
// Add this at end of each router to catch 404
apiRouter.use(notFound);

export default apiRouter;
