// Sample REST API
import { Router } from 'express';
import logger from '../logger/logger';
import { notFound } from './error-handlers';
import bodyParser from 'body-parser';

const time = () => (new Date()).toISOString();

const api = Router();

// Middleware for handling JSON, Raw, Text and URL encoded form data
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

api.use(function (req, res, next) {
  logger.debug(`Incoming request for ${req.url}`);
  next();
});

api.get('/', (req, res) => res.type('json').json({
  status: 200,
  message: '/api',
  time: time()
}));

api.get('/ping', (req, res) => res.type('json').json({
  status: 200,
  message: 'pong!',
  time: time()
}));

api.post('/log', (req, res) => {
  // Choose at strategy for logging.
  // Just dumping body to log to keep it simple in boilerplate
  const level = req.body && req.body.level || 'error';

  if(req.body) {
    logger.log(level, JSON.stringify(req.body));
  }

  const status = req.body ? 200 : 204;
  res.status(status).send({
    status: status,
    message: req.body ? 'Messages logged' : 'No content',
    time: time()
  });
});

// Catch 404 and forward to error handler
// Add this at end of each router to catch 404
api.use(notFound);

export default api;
