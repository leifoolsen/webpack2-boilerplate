/*
 * Proxy example.
 * Try it out. Run "npm run test:proxy-example" from shell
 */

/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */

import apiServer from '../../../server/api-example-server';
import server from '../../../server';
import joinUrl from '../../../src/utils/join-url';

const describe = require('mocha').describe;
const before = require('mocha').before;
const after = require('mocha').after;
const it = require('mocha').it;
const expect = require('chai').expect;

const config = require('../../../src/config/config-builder')('test');

describe('Proxy to API server example', () => {

  // Start servers
  before( function (done) {

    // Starting the servers should not take more than 10s
    this.timeout(10000);
    apiServer.start();

    apiServer.app.on('serverStarted', () => {
      server.start();

      server.app.on('serverStarted', () => {
        done();
      });
    });

  });

  // Stop server
  after((done) => {
    if (server.handle) {
      server.stop();
    }
    if (apiServer.handle) {
      apiServer.stop(done);
    }
    else {
      done();
    }
  });

  it('should proxy "/api/ping" to API server', (done) => {
    const request = require('supertest');
    const agent = request.agent(server.app);

    agent
      .get(joinUrl(config.server.apiPath, 'ping'))
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.ping).to.equal('proxy pong!');
        done();
      })
      .catch(done);
  });
});
