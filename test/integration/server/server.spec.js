/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */

import server from '../../../server';
import joinUrl from '../../../src/utils/join-url';
import configBuilder from '../../../src/config/config-builder';

const describe = require('mocha').describe;
const before = require('mocha').before;
const after = require('mocha').after;
const it = require('mocha').it;
const expect = require('chai').expect;


// See: https://mrvautin.com/ensure-express-app-started-before-tests/
// See: http://developmentnow.com/2015/02/05/make-your-node-js-api-bulletproof-how-to-test-with-mocha-chai-and-supertest/
// See: https://blog.codeship.com/testing-http-apis-supertest/
describe('Express server', () => {

  const config = configBuilder('test');

  // Start server
  before( function (done) {

    // webpack may take more than 2000ms to compile
    this.timeout(10000);

    server.start();

    server.app.on('serverStarted', () => {
      done();
      expect(server.handle).to.not.be.null;
      expect(server.handle.address()).to.be.an('object');
    });
  });


  // Stop server
  after((done) => {
    if (server.handle) {
      server.stop(done);
    }
    else {
      done();
    }
  });

  describe('Starting and stopping', () => {
    it('should have an Express server up and running', () => {
      expect(server.handle).to.not.be.null;
      expect(server.handle.address()).to.be.an('object');
    });
  });

  describe('Request/Response', () => {
    const request = require('supertest');
    const agent = request.agent(server.app);

    describe('Public path', () => {

      it('should load index.html, .end() version', (done) => {
        agent
          .get(config.server.publicPath)
          .set('Accept', 'text/html')
          .expect('Content-Type', /text/)
          .expect(200)
          .end((err, res) => {
            if(err) {
              return done(err);
            }
            // NOTE: The AssertionError should be handled to avoid
            // an Uncaught AssertionError to "bubble" to server
            try {
              expect(res.text).to.include('<!DOCTYPE html>');
            }
            catch(ae) {
              return done(ae);
            }
            done();
          });
      });

      it('should load index.html, .then/.catch version', (done) => {
        agent
          .get(config.server.publicPath)
          .set('Accept', 'text/html')
          .expect('Content-Type', /text/)
          .expect(200)
          .then(res => {
            expect(res.text).to.include('<!DOCTYPE html>');
            done();
          })
          .catch(done);
      });
    });

    describe('API', () => {

      it('responds to /api/ping with 200, .end() version', (done) => {
        agent
          .get(joinUrl(config.server.apiPath, 'ping'))
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            try {
              expect(res.body.ping).to.equal('pong!');
            }
            catch(ae) {
              return done(ae);
            }
            done();
          });
      });

      it('responds to /api/ping with 200, .then/catch version', (done) => {
        agent
          .get(joinUrl(config.server.apiPath, 'ping'))
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(res => {
            expect(res.body.ping).to.equal('pong!');
            done();
          })
          .catch(done);
      });

      it('responds to /api/foobar with 404', (done) => {
        agent
          .get(joinUrl(config.server.apiPath, 'foobar'))
          .set('Accept', 'application/json')
          .expect(404)
          .end(done);
      });
    });
  });
});
