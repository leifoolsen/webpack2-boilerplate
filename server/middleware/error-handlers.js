// Error handlers
// http://expressjs.com/en/guide/error-handling.html

import logger from '../logger/logger';
import {NotFoundException} from './exceptions';

//  Catch 404 and forward to error handler
const notFound = (req, res, next) => {
  next(NotFoundException(req.path));
};

// Log errors
const logErrors = (err, req, res, next) => {
  logger.error(process.env.NODE_ENV === 'test' ? err.message : err);
  next(err);
};

// Client error handler
const clientErrorHandler = (err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({
      status: 500,
      message: 'Internal server error'
    });
  }
  else {
    next(err);
  }
};

// Catch all error handler
const errorHandler = (err, req, res, next) => {

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).send({
    status: err.status || 500,
    message: err.message || 'Internal server error',
    time: (new Date()).toISOString()
  });
};

export {
  notFound,
  logErrors,
  clientErrorHandler,
  errorHandler
};
