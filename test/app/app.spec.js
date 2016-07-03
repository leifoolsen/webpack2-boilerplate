// IntelliJ does not understand
//import { describe, it } from 'mocha';
//import { expect } from 'chai';

const describe = require('mocha').describe;
const it = require('mocha').it;
const expect = require('chai').expect;

import App from '../../src/app/app';

describe('App', () => {

  describe('#constructor()', () => {
    it('creates an insance', () => {
      expect(() => {
        new App();
      }).to.not.throw(Error);
    });
  });

});
