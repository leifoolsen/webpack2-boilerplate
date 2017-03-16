import { describe, it } from 'mocha';
import { assert } from 'chai';
import joinUrl from '../../../src/utils/join-url';

describe('join-url', () => {

  it('should join two url strings into one', () => {
    const root = '/root/';
    const part = 'part';
    const expected = '/root/part';
    const result = joinUrl(root, part);
    assert.equal(result, expected);
  });

  it('should join three url strings into one', () => {
    const root = '/root/';
    const part = '/part/';
    const last = '/last/';
    const expected = '/root/part/last';
    const result = joinUrl(root, part, last);
    assert.equal(result, expected);
  });
});
