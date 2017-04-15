import { describe, it } from 'mocha';
import { expect } from 'chai';
import { setupJsDom, teardownJsDom } from '../../jsdom-init';
import isElement from '../../../src/utils/is-element';

describe('is-element', () => {
  before(() => {
    setupJsDom();
  });

  after(() => {
    teardownJsDom();
  });

  describe('is a DOM element', () => {
    it('HTML Element', () => {
      const dummy = document.body.appendChild(document.createElement('div'));
      expect(isElement(dummy)).to.be.true;
    });

    it('SVG Element', () => {
      const dummy = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      document.body.appendChild(dummy);
      expect(isElement(dummy)).to.be.true;
    });
  });

  describe('is not a DOM element', () => {
    it('undefined', () => {
      expect(isElement()).to.be.false;
    });

    it('null', () => {
      expect(isElement(null)).to.be.false;
    });

    it('boolean', () => {
      expect(isElement(false)).to.be.false;
      expect(isElement(true)).to.be.false;
    });

    it('number', function() {
      expect(isElement(1)).to.be.false;
      expect(isElement(1.23)).to.be.false;
    });

    it('string', function() {
      expect(isElement('aaa')).to.be.false;
    });

    it('array', function() {
      expect(isElement([])).to.be.false;
      expect(isElement(['aaa', 'bbb'])).to.be.false;
    });

    it('object', function() {
      expect(isElement({})).to.be.false;
      expect(isElement({
        aaa: 'bbb'
      })).to.be.false;
    });

    it('TextNode', function() {
      const dummy = document.body.appendChild(document.createTextNode('aaa'));
      expect(isElement(dummy)).to.be.false;
    });

    it('Document Fragment', function() {
      const dummy = document.body.appendChild(document.createDocumentFragment());
      expect(isElement(dummy)).to.be.false;
    });
  });

});
