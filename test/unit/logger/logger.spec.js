/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */

import { Response } from 'whatwg-fetch';
import sinon from 'sinon';
import { before, after, beforeEach, afterEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { setupJsDom, teardownJsDom } from '../../jsdom-init';
import logger, {LOG_LEVEL} from '../../../src/logger/logger';

const jsonOk = body => {
  const mockResponse = new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-type': 'application/json'
    }
  });
  return Promise.resolve(mockResponse);
};

describe('logger', () => {

  before ( () => {
    setupJsDom('<!doctype html><html><body><div id="mount"></div></body></html>');
  });

  after(() => {
    teardownJsDom();
  });

  it('setting a logger property should throw ReferenceError', () => {
    expect( () => {
      logger.info = 'not_allowed';
    }).to.throw(ReferenceError);
  });

  describe('console logger', () => {
    before(() => {
      expect(logger.consoleLogger).to.not.be.undefined;
      logger.remoteLogger.level = 'silent';
    });

    it('should set console log level to "info"', () => {
      const cl = logger.consoleLogger;
      expect(cl).to.not.be.undefined;
      cl.level = 'info';
      expect(cl.level).to.equal(LOG_LEVEL.info);
    });

    it('should set console log level to "LOG_LEVEL.error"', () => {
      logger.consoleLogger.level = 3;
      expect(logger.consoleLogger.level).to.equal(LOG_LEVEL.error);
    });

    it('should log debug message to console', () => {
      // eslint-disable-next-line no-void
      const stubLog = sinon.stub(console, 'log').returns(void 0); // Cannot stub in beforeEach; silences Mocha output
      try {
        logger.consoleLogger.level = 'debug';
        logger.debug('logged');
        expect(console.log.called).to.be.true; //eslint-disable-line no-console
        expect(console.log.getCall(0).args[2]).to.equal('logged'); //eslint-disable-line no-console
      }
      finally {
        stubLog.restore();
      }
    });

    it('should not log debug messages to console', () => {
      // eslint-disable-next-line no-void
      const stubLog = sinon.stub(console, 'log').returns(void 0); // Cannot use beforeEach; silences Mocha output
      try {
        logger.consoleLogger.level = 'info';
        logger.debug('abc');
        expect(console.log.called).to.be.false; //eslint-disable-line no-console
      }
      finally {
        stubLog.restore();
      }
    });

    it('console log should be silent', () => {
      // eslint-disable-next-line no-void
      const stubLog = sinon.stub(console, 'log').returns(void 0); // Cannot use beforeEach; silences Mocha output
      try {
        logger.consoleLogger.level = 'silent';
        logger.debug('debug');
        logger.info('info');
        logger.notice('notice');
        logger.warn('warn');
        logger.error('error');
        logger.critical('critical');
        logger.alert('alert');
        logger.emergency('emergency');
        expect(console.log.called).to.be.false; //eslint-disable-line no-console
      }
      finally {
        stubLog.restore();
      }
    });
  });

  describe('remote logger', () => {
    let spy;
    let fetchStub;

    before(() => {
      expect(logger.remoteLogger).to.not.be.undefined;
      logger.consoleLogger.level = 'silent';

      if(!global.fetch) {
        //eslint-disable-next-line global-require
        global.fetch = require('whatwg-fetch').fetch;
      }
      spy = sinon.spy(logger.remoteLogger, 'log');
    });

    beforeEach(() => {
      fetchStub = sinon.stub(global, 'fetch');
      fetch.returns(jsonOk());
    });

    afterEach(() => {
      spy.reset();
      fetchStub.restore();
    });

    it('should set remote log level to "info"', () => {
      logger.remoteLogger.level = 'info';
      expect(logger.remoteLogger.level).to.equal(LOG_LEVEL.info);
    });

    it('should set console log level to "LOG_LEVEL.error"', () => {
      logger.remoteLogger.level = LOG_LEVEL.error;
      expect(logger.remoteLogger.level).to.equal(LOG_LEVEL.error);
    });

    it('should log one error message to remote', () => {
      logger.remoteLogger.level = 'error';
      logger.remoteLogger.batchSize = 1;
      logger.error('an error msg');
      expect(spy.called).to.be.true;
      expect(global.fetch.called).to.be.true;
    });

    it('should log a batch of error messages to remote', () => {
      logger.remoteLogger.level = 'error';
      logger.remoteLogger.batchSize = 3;

      logger.error('error msg #1');
      expect(global.fetch.called).to.be.false;

      logger.error('error msg #2');
      expect(global.fetch.called).to.be.false;

      logger.error('error msg #3');
      expect(global.fetch.called).to.be.true;
    });

    it('should not log debug message to remote', () => {
      logger.remoteLogger.level = 'error';
      logger.debug('a debug msg');
      expect(spy.called).to.be.true;
      expect(global.fetch.called).to.be.false;
    });

  });

});
