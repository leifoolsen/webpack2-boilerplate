import express from 'express';
import bodyParser from 'body-parser';
import config from '../config';
import logger from './logger/logger';
import { notFound, logErrors, clientErrorHandler, errorHandler } from './middleware/error-handlers';
import api from './middleware/api';

// Set Winston console log level
logger.transports.console.level = config.logger.console.level;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', api);

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
process.on('uncaughtException', err => {
  logger.error('Server Uncaught Exception ', err);
  process.exit(1);
});

export default app;
