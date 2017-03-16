import server from '../../../server';
import joinUrl from '../../../src/utils/join-url';

const describe = require('mocha').describe;
const before = require('mocha').before;
const after = require('mocha').after;
const it = require('mocha').it;
const expect = require('chai').expect;


// See: https://mrvautin.com/ensure-express-app-started-before-tests/
describe('Express server', () => {

  const config = require('../../../src/config');

  // Start server
  before((done) => {
    server.start();

    server.handle.on('serverStarted', () => {
      done();
      expect(server.handle).to.not.be.null;
      expect(server.handle.address()).to.be.an.object;
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
      expect(server.handle.address()).to.be.an.object;
    });
  });

  describe('Request/Response', () => {
    const request = require('supertest');
    const agent = request.agent(server.app);

    describe('Public path', () => {
      it('should load index.html', () => {
        agent
          .get(config.publicPath)
          .set('Accept', 'text/html')
          .expect(200)
          .then(response => {
            expect(response.text).to.include('<!DOCTYPE html>');
          });
      });
    });

    describe('API', () => {

      it('responds to /api/ping with 200', (done) => {
        agent
          .get(joinUrl(config.apiPath, 'ping'))
          .expect(200, done);
      });

      it('responds to /api/foobar with 404', (done) => {
        agent
          .get(joinUrl(config.apiPath, 'foobar'))
          .expect(404, done);
      });
    });
  });
});
