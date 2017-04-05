import requireUncached from 'require-uncached';
import { before, after, describe, it } from 'mocha';
import { assert } from 'chai';
import sinon from 'sinon';
import { setupJsDom, teardownJsDom } from '../../jsdom-init';

describe('IE11 polyfill', () => {
  let sandbox;

  before(() => {
    sandbox = sinon.sandbox.create();
    setupJsDom();
    requireUncached('../../../src/utils/ie11-polyfill');
  });

  after(() => {
    teardownJsDom();
    sandbox.restore();
  });

  describe('Event', () => {

    it('should be defined', () => {
      assert.isDefined(window.Event);
    });

    it('should create an event', () => {
      assert.doesNotThrow(() => {
        let e = new window.Event('foo', { bubbles: true, cancelable: true });
        assert(e);
        assert.equal(e.type, 'foo');
        assert.isTrue(e.bubbles);
        assert.isTrue(e.cancelable);

        e = new window.Event('bar');
        assert(e);
        assert.equal(e.type, 'bar');
        assert.isFalse(e.bubbles);
        assert.isFalse(e.cancelable);
      }, Error);
    });

    it('should create an event and fire resize', () => {
      const spy = sinon.spy();
      window.addEventListener('resize', spy, true);
      try {
        const event = new window.Event('resize');
        assert(event);
        window.dispatchEvent(event);
      }
      finally {
        window.removeEventListener('resize', spy);
      }
      assert.isTrue(spy.called, 'Expected "resize" event to fire');
    });
  });

  describe('Event defaultPrevented', () => {

    it('should prevent default', () => {
      const e = new window.Event('foo', { cancelable: true });
      e.preventDefault();
      assert.isTrue(e.defaultPrevented);
    });

    it('should not prevent default', () => {
      const e = new window.Event('foo');
      e.preventDefault();
      assert.isFalse(e.defaultPrevented);
    });

  });

  describe('CustomEvent', () => {

    it('should be defined', () => {
      assert.isDefined(window.CustomEvent);
    });

    it('should create a customevent', () => {
      assert.doesNotThrow(() => {
        const e = new window.CustomEvent('cat', { bubbles: true, cancelable: true, detail: {} });
        assert.isNotNull(e);
      }, Error);
    });

    it('should create a CustomEvent with default init attributes', () => {
      const ce = new window.CustomEvent('cat');
      assert.equal(ce.type, 'cat');
      assert.equal(ce.bubbles, false);
      assert.equal(ce.cancelable, false);
      assert.equal(ce.detail, null);
    });

    it('should create a CustomEvent with bubbles:true', () => {
      const ce = new window.CustomEvent('cat', { bubbles: true });
      assert.equal(ce.type, 'cat');
      assert.equal(ce.bubbles, true);
      assert.equal(ce.cancelable, false);
      assert.equal(ce.detail, null);
    });

    it('should create a CustomEvent instance with a detail object', () => {
      const ce = new window.CustomEvent('cat', { detail: { sound: 'meow' } });
      assert.equal(ce.type, 'cat');
      assert.equal(ce.bubbles, false);
      assert.equal(ce.cancelable, false);
      assert.equal(ce.detail.sound, 'meow');
    });

    it('should work', () => {
      const ce = new window.CustomEvent('sound', { bubbles: false, detail: { species: 'bird', sound: 'tweet' } });
      const spy = sinon.spy();
      document.body.addEventListener('sound', spy);
      document.body.dispatchEvent(ce);
      assert.isTrue(spy.called, 'Expected custom event to fire');
    });

    it('should prevent default', () => {
      const ce = new window.CustomEvent('music', { cancelable: true });
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
      assert.doesNotThrow(() => {
        let e = new window.MouseEvent('click', {
          'view': window,
          'bubbles': true,
          'cancelable': true
        });
        assert(e);
        assert.equal(e.type, 'click');
        assert.isTrue(e.bubbles);
        assert.isTrue(e.cancelable);

        e = new window.MouseEvent('mousedown', {
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

    it('should create a mouse event and fire mousedown', () => {

      const mouseDownEvent = new window.MouseEvent('mousedown', {
        'view': window,
        'bubbles': false,
        'cancelable': false,
        'clientX': 10,
        'clientY': 0
      });
      assert(mouseDownEvent);

      const button = document.createElement('button');
      const spy = sinon.spy();
      button.addEventListener('mousedown', spy);
      button.dispatchEvent(mouseDownEvent);
      assert.isTrue(spy.called, 'Expected "select" event to fire');
    });
  });
});
