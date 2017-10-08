// Use Winston as a console logger

import winston from 'winston';

// Set up logger
const logger = new (winston.Logger)({
  levels: {
    // RFC5424 syslog levels
    // https://tools.ietf.org/html/rfc5424
    emerg:  0, // system is unusable
    alert:  1, // action must be taken immediately
    crit:   2, // action must be taken immediately
    error:  3, // error conditions
    warn:   4, // warning conditions
    notice: 5, // normal but significant condition
    info:   6, // informational condition
    debug:  7, // debug condition

  },
  transports: [
    new (winston.transports.Console)({
      level: 'info',
      colorize: true,
      timestamp: () => (new Date()).toISOString(),
    }),
  ]
});

// To change log level do:
// logger.transports.console.level = 'info';

/*
logger.emerg ('EMERGENCY LOG, system is unusable');
logger.alert ('ALERT LOG, action must be taken immediately');
logger.crit  ('CRIT LOG, action must be taken immediately');
logger.error ('ERROR LOG, error conditions');
logger.warn  ('WARNING LOG, warning conditions');
logger.notice('NOTICE LOG, normal but significant condition');
logger.info  ('INFO LOG, informational condition');
logger.debug ('DEBUG LOG, debug condition');
*/

export default logger;
