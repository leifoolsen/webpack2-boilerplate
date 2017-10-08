/*
 * Proxy example.
 * Try it out. Run "npm run test:proxy-example" from shell
 */

/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */

import apiServer from '../../../server/proxy-example';
import server from '../../../server/server';

const describe = require('mocha').describe;
const before = require('mocha').before;
const after = require('mocha').after;
const it = require('mocha').it;
const expect = require('chai').expect;

describe('Proxy to API server example', () => {

  // Start servers
  before( function (done) {

    // Fail if starting the servers takes more than 20s
    this.timeout(20000);

    apiServer.app.on('apiStarted', () => {

      server.app.on('serverStarted', () => {
        done();
      });

      server.start();
    });

    apiServer.start();
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

  it('/api/ping should return "pong"', async() => {
    const request = require('supertest');
    const agent = request.agent(server.app);
    await agent
      .get('/api/ping')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).to.equal('pong!');
      });
  });

});
