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
      expect(isElement(dummy)).to.equal(true);
    });

    /*
    SVG element is unsupported in JsDom.
    See: https://github.com/tmpvar/jsdom/issues/1986, See: https://github.com/tmpvar/jsdom/issues/2001

    it('SVG Element', () => {
      const dummy = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      document.body.appendChild(dummy);
      expect(isElement(dummy)).to.equal(true);
    });
    */
  });

  describe('is not a DOM element', () => {
    it('undefined', () => {
      expect(isElement()).to.equal(false);
    });

    it('null', () => {
      expect(isElement(null)).to.equal(false);
    });

    it('boolean', () => {
      expect(isElement(false)).to.equal(false);
      expect(isElement(true)).to.equal(false);
    });

    it('number', function() {
      expect(isElement(1)).to.equal(false);
      expect(isElement(1.23)).to.equal(false);
    });

    it('string', function() {
      expect(isElement('aaa')).to.equal(false);
    });

    it('array', function() {
      expect(isElement([])).to.equal(false);
      expect(isElement(['aaa', 'bbb'])).to.equal(false);
    });

    it('object', function() {
      expect(isElement({})).to.equal(false);
      expect(isElement({
        aaa: 'bbb'
      })).to.equal(false);
    });

    it('TextNode', function() {
      const dummy = document.body.appendChild(document.createTextNode('aaa'));
      expect(isElement(dummy)).to.equal(false);
    });

    it('Document Fragment', function() {
      const dummy = document.body.appendChild(document.createDocumentFragment());
      expect(isElement(dummy)).to.equal(false);
    });
  });

});
