import express from 'express';
import config from '../config';
import logger from './logger/logger';
import api from './middleware/api';
import {
  notFound,
  logErrors,
  clientErrorHandler,
  errorHandler
} from './middleware/error-handlers';

// Set Winston console log level
logger.transports.console.level = config.logger.console.level;

const app = express();

app.set('env', process.env.NODE_ENV);
logger.info(`Application env: ${process.env.NODE_ENV}`);

// app.use(function (req, res, next) {
//   logger.debug(`Incoming request for ${req.url}`);
//   next();
// });

app.use('/api', api);

app.get('/', (req, res) => res.type('json').json({
  status: 200,
  message: 'OK',
  time: (new Date()).toISOString()
}));

// Catch 404 and forward to error handler
app.use(notFound);

// Error handlers
app.use(logErrors);          // Log errors
app.use(clientErrorHandler); // Client error handler
app.use(errorHandler);       // Catch all error handler

// See: https://nodejs.org/api/process.html#process_event_unhandledrejection
process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at:', p, 'reason:', reason);
});

// See: https://nodejs.org/api/process.html#process_event_uncaughtexception
process.on('uncaughtException', (err) => {
  logger.error('Server Uncaught Exception ', err);
  process.exit(1);
});

export default app;
