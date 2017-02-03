import { Response } from 'whatwg-fetch';
import sinon from 'sinon';
import { before, after, beforeEach, afterEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { setupJsDom, teardownJsDom } from '../jsdom-init';
import request from '../../src/utils/request';


const jsonOk = body => {
  const mockResponse = new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-type': 'application/json'
    }
  });
  return Promise.resolve(mockResponse);
};

const jsonError = (status, statusText) => {
  const mockResponse = new Response('', {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json',
    },
  });
  return Promise.resolve(mockResponse);
};

const networkFailure = () => {
  return Promise.resolve(undefined);
}

describe('request', () => {

  before(() => {
    setupJsDom();
    if (!global.fetch) {
      global.fetch = require('whatwg-fetch').fetch;
    }
  });

  after(() => {
    teardownJsDom();
  });

  beforeEach(() => {
    sinon.stub(global, 'fetch');
  });

  afterEach(() => {
    sinon.restore(global.fetch); // or: global.fetch.restore();
  });

  describe('successful response', () => {
    beforeEach(() => {
      fetch.returns(jsonOk({
        hello: 'world'
      }));
    });

    it('should format the response correctly', (done) => {
      request('/whatever')
        .then((json) => {
          expect(json.hello).to.equal('world');
          done();
        })
        .catch(done);
    });
  });

  describe('error response', () => {
    beforeEach(() => {
      fetch.returns(jsonError(404, 'Not Found'));
    });

    it('should catch errors', (done) => {
      request('/errorpath')
        .then( () => {
          throw new Error('Should not return success');
        })
        .catch((err) => {
          expect(err.response.status).to.equal(404);
          expect(err.response.statusText).to.equal('Not Found');
          done();
        });
    });
  });

  describe('network failure', () => {
    beforeEach(() => {
      fetch.returns(networkFailure());
    });
    it('should catch response.status: 500 on network failure', (done) => {
      request('/good')
        .then( () => {
          throw new Error('Should not return success');
        })
        .catch((err) => {
          expect(err.response.status).to.equal(500);
          done();
        });
    });
  });

});
