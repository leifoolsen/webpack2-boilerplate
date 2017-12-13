const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('chai').assert;
const expect = require('chai').expect;

import stringlist from '../../../src/utils/stringlist';

describe('stringlist', () => {
  it('creates a stringlist with two items', () => {
    expect(stringlist('foo', 'bar')).to.include.members(['foo', 'bar']);
  });
  it('joins strings and objects', () => {
    expect(stringlist('foo', { bar: true, duck: false }, 'baz', { quux: true })).to.include.members(['foo', 'bar', 'baz', 'quux']);
  });
  it('does not join falsy arguments', () => {
    expect(stringlist('foo', undefined, null, {})).to.include.members(['foo']);
  });
  it('returns an empty array if all arguments are falsy', () => {
    assert.isEmpty(stringlist('', undefined, null, {}, { bar: false, duck: false }));
    assert.isEmpty(stringlist(''));
    assert.isEmpty(stringlist(null));
    assert.isEmpty(stringlist(undefined));
    assert.isEmpty(stringlist({}));
    assert.isEmpty(stringlist([]));
    assert.isEmpty(stringlist('', null, undefined, {}, []));
  });
  it('should be eqal: [string, string] === [string, object]', () => {
    expect(stringlist('foo-1', 'bar-2')).to.be.eql(stringlist('foo-1', {'bar-2': true}));
  });
});
