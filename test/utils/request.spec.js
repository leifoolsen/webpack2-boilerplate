import sinon from 'sinon';
import { before, after, beforeEach, afterEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { setupJsDom, teardownJsDom } from '../jsdom-init';

import { Response } from 'whatwg-fetch';


const response = (obj) => {
  let json = JSON.stringify(obj);
  var response = new Response(json, {
    status: 200,
    headers: { 'Content-type': 'application/json' }
  });
  return Promise.resolve(response);
};

const sampleResponse = {
  'hello': 'world'
};


const request = (url, options) =>
  fetch(url, options)
    .then( response => response.json());


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

  describe('stubbing successful response', () => {

    before(()=> {
      sinon.stub(global, 'fetch', (url, options) => {
        return response(sampleResponse);
      })
    });

    after(()=> {
      sinon.restore(global.fetch); // or: global.fetch.restore();
    });

    it('should fetch', (done) => {
      request('/whatever')
        .catch(done)
        .then((json) => {
          expect(json.hello).to.equal('world');
          done();
        });
    });
  });
});



