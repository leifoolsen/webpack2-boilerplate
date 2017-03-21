import { describe, it } from 'mocha';
import { assert } from 'chai';
import deepMerge from '../../../src/utils/deep-merge';

describe('deep-merge', () => {

  it('should shallow merge two objects', () => {
    const x = { a: 2 };
    const y = { a: 1, b: 3 };
    const z = { ...x, ...y };
    const expected = {a: 1, b: 3};

    const m = deepMerge(x, y);
    assert.deepEqual(m, expected);
    assert.deepEqual(m, z);
  });

  it('should assert that Object.assign is shallow', () => {
    const x = { a: { a: 1 } };
    const y = { a: { b: 1 } };
    const z = { ...x, ...y };
    const expected = { a: { a: 1, b: 1 } };
    assert.notDeepEqual(z, expected);
  });

  it('should deep merge two objects', () => {
    const x = { a: { a: 1 } };
    const y = { a: { b: 1 } };
    const expected = { a: { a: 1, b: 1 } };

    const m = deepMerge(x, y);
    assert.deepEqual(m, expected);
  });

  it('should deep merge three objects', () => {
    const x = { a: { a: 1 } };
    const y = { a: { b: 1 } };
    const z = { a: { c: 1 } };
    const expected = { a: { a: 1, b: 1, c: 1 } };

    const m = deepMerge(x, y, z);
    assert.deepEqual(m, expected);
  });

  it('should be immutable', () => {
    const x = { a: { a: 1 } };
    const y = { a: { b: 1 } };
    const z = { a: { c: 1 } };
    const expectedX = { a: { a: 1 } };
    const expectedY = { a: { b: 1 } };
    const expectedZ = { a: { c: 1 } };

    deepMerge(x, y, z);
    assert.deepEqual(x, expectedX);
    assert.deepEqual(y, expectedY);
    assert.deepEqual(z, expectedZ);
  });

  it('should be an empty object after merge', () => {
    const x = {};
    const y = undefined;
    const expected = {};

    let z = deepMerge(x, y);
    assert.deepEqual(z, expected);

    z = deepMerge(y, x);
    assert.deepEqual(z, expected);
  });

  it('should be same as non empty object after merge', () => {
    const x = { a: { a: 1 } };
    const y = undefined;

    let z = deepMerge(x, y);
    assert.deepEqual(z, x);

    z = deepMerge(y, x);
    assert.deepEqual(z, x);
  });

});
