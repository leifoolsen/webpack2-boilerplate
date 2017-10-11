/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */

import request from 'supertest';
import config from '../../../config';
import server from '../../../server/server';
import joinUrl from '../../../src/utils/join-url';

const describe = require('mocha').describe;
const before = require('mocha').before;
const after = require('mocha').after;
const it = require('mocha').it;
const expect = require('chai').expect;

// See: https://mrvautin.com/ensure-express-app-started-before-tests/
// See: http://developmentnow.com/2015/02/05/make-your-node-js-api-bulletproof-how-to-test-with-mocha-chai-and-supertest/
// See: https://blog.codeship.com/testing-http-apis-supertest/
// See: https://github.com/vmasto/express-babel

describe('Express server', () => {

  // Start server
  before( function (done) {
    //       ^-- Can't use fat arrow. Need access to this

    // webpack may take more than 2000ms to compile
    this.timeout(20000);

    // TODO: Figure out how to run integration tests without webpack
    server.start(() => {
      done();
      expect(server.handle).to.not.equal(null);
      expect(server.handle).to.be.an('object');
    });
  });


  // Stop server
  after( done => {
    server.stop(() => {
      done();

      // mocha-4.0.1 hangs if I do not call process.exit.
      // mocha-3.5.3 did not need this to exit tests.
      process.exit(0);
    });
  });

  describe('Starting and stopping', () => {
    it('should have an Express server up and running', () => {
      expect(server.handle).to.not.equal(null);
      expect(server.handle).to.be.an('object');
    });
  });

  describe('Request/Response', () => {
    const agent = request.agent(server.app);

    describe(`Public path "${config.server.publicPath}"`, () => {

      it('should render index.html', async() => {
        await agent
          .get(config.server.publicPath)
          .set('Accept', 'text/html')
          .expect('Content-Type', /text/)
          .expect(200)
          .then(res => {
            expect(res.text).to.include('<!DOCTYPE html>');
          });
      });

      it(`should render index.html when request url is "${joinUrl(config.server.publicPath, 'foo')}"`, async() => {
        await agent
          .get(joinUrl(config.server.publicPath, 'foo'))
          .set('Accept', 'text/html')
          .expect('Content-Type', /text/)
          .expect(200)
          .then(res => {
            expect(res.text).to.include('<!DOCTYPE html>');
          });
      });
    });

    describe(`${config.apiPath}`, () => {

      it('/ping should return "pong"', async() => {
        await agent
          .get(joinUrl(config.apiPath, 'ping'))
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(res => {
            expect(res.body.message).to.equal('pong!');
          });
      });

      it('should post message to /log', async() => {
        await agent
          .post(joinUrl(config.apiPath, 'log'))
          .set('Accept', 'application/json')
          .send({
            level: 'debug', message: 'An error message'
          })
          .expect(200);
      });

      it('should return 404 for non-existent URL: /foobar', async() => {
        await agent
          .get(joinUrl(config.apiPath, 'foobar'))
          .set('Accept', 'application/json')
          .expect(404);
      });
    });
  });
});
