/*
 * Proxy example.
 * Try it out. Run "npm run test:proxy-example" from shell
 */

/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */

import startApi from '../../../server/api-server';
import server from '../../../server/server';

const describe = require('mocha').describe;
const before = require('mocha').before;
const after = require('mocha').after;
const it = require('mocha').it;
const expect = require('chai').expect;

describe('Proxy to API server example', () => {

  let apiServer;

  // Start servers
  before( function (done) {

    // Fail if starting the servers takes more than 20s
    this.timeout(20000);

    startApi((s) => {
      apiServer = s;
      server.start(() => {
        done();
      });
    });
  });

  // Stop servers
  after((done) => {
    server.stop(() => {
      apiServer.close(() => {
        done();
        // mocha-4.0.1 hangs if I do not call process.exit.
        // mocha-3.5.3 did not need this to exit tests.
        process.exit(0);
      });
    });
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
