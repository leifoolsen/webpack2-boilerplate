import { describe, it } from 'mocha';
import { expect } from 'chai';
import isEmpty from '../../../src/utils/is-empty';

describe('is-empty', () => {

  it('should return true if value is a empty', () => {
    expect(isEmpty()).to.be.true;
    expect(isEmpty(null)).to.be.true;
    expect(isEmpty('    ')).to.be.true;
    expect(isEmpty('')).to.be.true;
  });

  it('should return false if value is not empty', () => {
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

  it('should return true if collection is a empty', () => {
    const map = new Map();
    expect(isEmpty(map)).to.be.true;

    const set = new Set();
    expect(isEmpty(set)).to.be.true;
  });

  it('should return false if collection is not a empty', () => {
    const map = new Map();
    map.set('foo', 'bar');
    expect(isEmpty(map)).to.be.false;

    const set = new Set([true, 'Ben', 5]);
    expect(isEmpty(set)).to.be.false;
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
