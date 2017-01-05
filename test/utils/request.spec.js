import sinon from 'sinon';
import { before, after, beforeEach, afterEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { setupJsDom, teardownJsDom } from '../jsdom-init';

import { Response } from 'whatwg-fetch';
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

describe('request', () => {

  before (() => {
    setupJsDom();
    if(!global.fetch) {
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

  describe('stubbing successful response', () => {
    beforeEach(()=> {
      fetch.returns(jsonOk({
        hello: 'world'
      }));
    });

    it('should format the response correctly', (done) => {
      request('/whatever')
        .catch(done)
        .then((json) => {
          expect(json.hello).to.equal('world');
          done();
        });
    });
  });

  describe('stubbing error response', () => {
    beforeEach(()=> {
      fetch.returns(jsonError(404, 'Not Found'));
    });

    it('should catch errors', (done) => {
      request('/errorpath')
        .catch((err) => {
          expect(err.response.status).to.equal(404);
          expect(err.response.statusText).to.equal('Not Found');
          done();
        });
    });
  });

});



