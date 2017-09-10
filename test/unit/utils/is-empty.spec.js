/* eslint no-unused-expressions: 0 */

import { describe, it } from 'mocha';
import { expect } from 'chai';
import isEmpty from '../../../src/utils/is-empty';

describe('is-empty', () => {

  it('should return true if value is undefined', () => {
    expect(isEmpty()).to.be.true;
  });

  it('should return true if value is null', () => {
    expect(isEmpty(null)).to.be.true;
  });

  it('should return true if value is a empty string', () => {
    expect(isEmpty('')).to.be.true;
  });

  it('should return true if value is a blank string', () => {
    expect(isEmpty('    ')).to.be.true;
  });

  it('should return false if value is not a empty string', () => {
    expect(isEmpty('test')).to.be.false;
    expect(isEmpty('a')).to.be.false;
  });

  it('should return true if array is a empty', () => {
    expect(isEmpty([])).to.be.true;
  });

  it('should return false if array is not a empty', () => {
    expect(isEmpty([1, 2])).to.be.false;
  });

  it('should return true if object is a empty', () => {
    expect(isEmpty({})).to.be.true;
  });

  it('should return false if object is not a empty', () => {
    expect(isEmpty({ 'foo': 1, 'bar': 2 })).to.be.false;
  });

  it('should return true if Map is a empty', () => {
    const map = new Map();
    expect(isEmpty(map)).to.be.true;
  });

  it('should return false if Map is not a empty', () => {
    const map = new Map();
    map.set('foo', 'bar');
    expect(isEmpty(map)).to.be.false;
  });

  it('should return true if Set is a empty', () => {
    const set = new Set();
    expect(isEmpty(set)).to.be.true;
  });

  it('should return false if Set is not a empty', () => {
    const set = new Set([true, 'Ben', 5]);
    expect(isEmpty(set)).to.be.false;
  });

  it('should throw ReferenceError when value is a empty WeakMap', () => {
    const weakMap = new WeakMap();
    expect(() => {
      isEmpty(weakMap);
    }).to.throw(ReferenceError);
  });

  it('should throw ReferenceError when value is a non empty WeakMap', () => {
    const weakMap = new WeakMap();
    const foo = {};
    const bar = {};
    weakMap.set(foo, 'foo');
    weakMap.set(bar, 'bar');

    expect(() => {
      isEmpty(weakMap);
    }).to.throw(ReferenceError);
  });

  it('should throw ReferenceError when value is a empty WeakSet', () => {
    const weakSet = new WeakSet();
    expect(() => {
      isEmpty(weakSet);
    }).to.throw(ReferenceError);
  });

  it('should throw ReferenceError when value is a non empty WeakSet', () => {
    const weakSet = new WeakSet();
    const foo = { foo: 'foo' };
    const bar = { bar: 'bar' };
    weakSet.add(foo);
    weakSet.add(bar);

    expect(() => {
      isEmpty(weakSet);
    }).to.throw(ReferenceError);
  });

  it('should not report empty for number', () => {
    expect(isEmpty(-1)).to.be.false;
    expect(isEmpty(0)).to.be.false;
    expect(isEmpty(1)).to.be.false;

    expect(isEmpty(Number(-1))).to.be.false;
    expect(isEmpty(Number(0))).to.be.false;
    expect(isEmpty(Number(1))).to.be.false;
  });

  it('should not report empty for boolean', () => {
    expect(isEmpty(false)).to.be.false;
    expect(isEmpty(true)).to.be.false;
  });

});
