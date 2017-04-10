/**
 * A simple logger a facade, makes it easy to switch logger implementation
 * at a later stage
 */

import request from '../utils/request';

const LOG_LEVEL = {
  // https://tools.ietf.org/html/rfc5424
  silent:   -1, // no logging
  emergency: 0, // system is unusable
  alert:     1, // action must be taken immediately
  critical:  2, // action must be taken immediately
  error:     3, // error conditions
  warn:      4, // warning conditions
  notice:    5, // normal but significant condition
  info:      6, // informational condition
  debug:     7, // debug condition
  log:       7, // debug condition
};

const LOG_COLOR = {
  emergency: 'red',
  alert:     'red',
  critical:  'red',
  error:     'red',
  warn:      'yellow',
  notice:    'green',
  info:      'green',
  debug:     'blue',
  log:       'blue',
};

const valueToKey = (obj, value) => Object.keys(obj).find(key => obj[key] === value);

const isString = str => str != null && typeof str === 'string';

class AbstractLogger {
  constructor(level) {
    this.level = level;
  }
  get level() {
    return this._level;
  }
  set level(value) {
    this._level = isString(value) && value in LOG_LEVEL ? LOG_LEVEL[value] : value;
  }
}

class ConsoleLogger extends AbstractLogger {
  constructor() {
    super(LOG_LEVEL.debug);
  }
  log(level, ...args) {
    if(level <= this.level) {
      const key = valueToKey(LOG_LEVEL, level);
      // eslint-disable-next-line no-console
      console.log(`%c${new Date().toISOString()} [${key}]:`, `color:${LOG_COLOR[key]}`, ...args);
    }
  }
}

class RemoteLogger extends AbstractLogger {
  constructor(consoleLogger) {
    super(LOG_LEVEL.silent);
    this.consoleLogger = consoleLogger;
    this.url = '/api/log';
    this._logMessages = [];
    this.batchSize = 10;
  }
  set consoleLogger(value) {
    this._consoleLogger = value;
  }
  set url(value) {
    this._url = value;
  }
  get url() {
    return this._url;
  }
  set batchSize(value) {
    this._batchSize = value;
  }
  get batchSize() {
    return this._batchSize;
  }
  get logMessages() {
    return this._logMessages;
  }
  send(messages) {
    request(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: messages
      })
    }).catch((err) => {
      const errStr = () => err.response ? `${err.response.status} - ${err.response.statusText}` : `${err}`;
      this._consoleLogger.log(LOG_LEVEL.error, `Remote logging failed: ${errStr()}`);
    });
  }
  flush() {
    const n = this._logMessages.length;
    if (n > 0) {
      this.send(this._logMessages.splice(0, n));
    }
  }
  log(level, ...args) {
    if(level <= this.level) {
      const data = {
        level: valueToKey(LOG_LEVEL, level),
        time: new Date().toISOString(),
        message: args.length > 0 ? args[0] : '',
        detail: args.length > 1 ? args.slice(1) : undefined,
        userAgent: navigator.userAgent,
      };

      this._logMessages.push(data);
      if (this._logMessages.length >= this.batchSize) {
        this.send(this._logMessages.splice(0, this.batchSize));
      }
    }
  }
}

const consoleLogger = new ConsoleLogger();
LOG_LEVEL.consoleLogger = consoleLogger;

const remoteLogger = new RemoteLogger(consoleLogger);
LOG_LEVEL.remoteLogger = remoteLogger;


const log = level => {
  return (...args) => {
    consoleLogger.log(LOG_LEVEL[level], ...args);
    remoteLogger.log(LOG_LEVEL[level], ...args);
  };
};

const logger = new Proxy({}, {
  get: (target, name) => {
    if('consoleLogger' === name) {
      return consoleLogger;
    }
    if('remoteLogger' === name) {
      return remoteLogger;
    }
    if('silent' !== name && name in LOG_LEVEL) {
      return log(name);
    }
    throw new ReferenceError(`cannot get "${name}"`);
  },
  set: (target, name) => {
    throw new ReferenceError(`cannot set "${name}"`); //... or return false;
  }
});

export default logger;
export {LOG_LEVEL};
