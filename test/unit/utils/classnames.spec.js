const describe = require('mocha').describe;
const it = require('mocha').it;
const expect = require('chai').expect;

import classnames from '../../../src/utils/classnames';

describe('classnames', () => {
  it('joins two strings with a single space as separator', () => {
    expect(classnames('foo', 'bar')).to.be.equal('foo bar');
  });
  it('joins strings and objects', () => {
    expect(classnames('foo', { 'bar': true, duck: false }, 'baz', { quux: true })).to.be.equal('foo bar baz quux');
  });
  it('does not join falsy arguments', () => {
    expect(classnames('foo', undefined, null, {})).to.be.equal('foo');
  });
  it('returns an empty string if all arguments are falsy', () => {
    expect(classnames('', undefined, null, {}, { bar: false, duck: false })).to.be.equal('');
  });
  it('should be eqal: [string, string] === [string, object]', () => {
    expect(classnames('foo-1', 'bar-2')).to.be.equal(classnames('foo-1', {'bar-2': true}));
  });
  it('joins strings without delimiters', () => {
    expect(classnames('foo', 'bar')).to.be.equal('foo bar');
  });
  it('has noting to join', () => {
    expect(classnames('', '')).to.be.equal('');
    expect(classnames('', null)).to.be.equal('');
    expect(classnames('', undefined)).to.be.equal('');
    expect(classnames('', {})).to.be.equal('');
    expect(classnames('', [])).to.be.equal('');
  });
});
