'use strict';
import requireUncached from 'require-uncached';
import { before, after, describe, it } from 'mocha';
import { assert } from 'chai';
import sinon from 'sinon';
import { setupJsDom, teardownJsDom } from '../../jsdom-init';


describe('IE11 polyfill', () => {
  let sandbox;

  before ( () => {
    sandbox = sinon.sandbox.create();
    setupJsDom();
    requireUncached( '../../../src/utils/ie11-polyfill');
  });

  after ( () => {
    teardownJsDom();
    sandbox.restore();
  });

  describe('Event defaultPrevented', () => {

    it('should prevent default', () => {
      const e = new Event('foo', { cancelable: true });
      e.preventDefault();
      assert.isTrue(e.defaultPrevented);
    });

  });

  describe('Event', () => {

    it('should be defined', () => {
      assert.isDefined(window.Event);
    });

    it('should create an event', () => {
      assert.doesNotThrow( () => {
        let e = new Event('foo', { bubbles: true, cancelable: true });
        assert(e);
        assert.equal(e.type, 'foo');
        assert.isTrue(e.bubbles);
        assert.isTrue(e.cancelable);

        e = new Event('bar');
        assert(e);
        assert.equal(e.type, 'bar');
        assert.isFalse(e.bubbles);
        assert.isFalse(e.cancelable);
      }, Error);
    });
  });

  describe('CustomEvent', () => {

    it('should be defined', () => {
      assert.isDefined(window.CustomEvent);
    });

    it('should create a customevent', () => {
      assert.doesNotThrow( () => {
        const e = new CustomEvent('cat', { bubbles: true, cancelable: true, detail: {} });
        assert.isNotNull(e);
      }, Error);
    });

    it('should create a CustomEvent with default init attributes', () => {
      const ce = new CustomEvent('cat');
      assert.equal(ce.type, 'cat');
      assert.equal(ce.bubbles, false);
      assert.equal(ce.cancelable, false);
      assert.equal(ce.detail, null);
    });

    it('should create a CustomEvent with bubbles:true', () => {
      const ce = new CustomEvent('cat', {bubbles: true});
      assert.equal(ce.type, 'cat');
      assert.equal(ce.bubbles, true);
      assert.equal(ce.cancelable, false);
      assert.equal(ce.detail, null);
    });

    it('should create a CustomEvent instance with a detail object', function () {
      const ce = new CustomEvent('cat', { detail: { sound: 'meow' } });
      assert.equal(ce.type, 'cat');
      assert.equal(ce.bubbles, false);
      assert.equal(ce.cancelable, false);
      assert.equal(ce.detail.sound, 'meow');
    });

    it('should work', () => {
      const ce = new CustomEvent('sound', { bubbles: false, detail: {species: 'bird', sound: 'tweet'} });
      const spy = sinon.spy();
      document.body.addEventListener('sound', spy);
      document.body.dispatchEvent(ce);
      assert.isTrue(spy.called, 'Expected custom event to fire');
    });

    it('should prevent default', () => {
      const ce = new CustomEvent('music', { cancelable: true });
      assert.isDefined(ce.preventDefault);
      ce.preventDefault();
      assert.isTrue(ce.defaultPrevented);
    });

  });

  describe('MouseEvent', () => {

    it('should be defined', () => {
      assert.isDefined(window.MouseEvent);
    });

    it('should create a mouse event', () => {
      assert.doesNotThrow( () => {
        let e = new MouseEvent('click', {
          'view': window,
          'bubbles': true,
          'cancelable': true
        });
        assert(e);
        assert.equal(e.type, 'click');
        assert.isTrue(e.bubbles);
        assert.isTrue(e.cancelable);

        e = new MouseEvent('mousedown', {
          'view': window,
          'bubbles': false,
          'cancelable': false,
          'clientX': 10,
          'clientY': 0
        });
        assert(e);
        assert.equal(e.type, 'mousedown');
        assert.isFalse(e.bubbles);
        assert.isFalse(e.cancelable);
        assert.equal(e.clientX, 10);
        assert.equal(e.clientY, 0);
      }, Error);
    });
  });

});


