import {describe, it} from 'mocha';
import {expect} from 'chai';
import parseURI from '../../../src/utils/parse-uri';

describe('parse-uri', () => {

  it('should parse "http://example.com:8042/over/there?name=ferret#nose" correctly', () => {
    const result = parseURI('http://example.com:8042/over/there?name=ferret#nose');
    const expectedResult = {
      scheme: 'http',
      host: 'example.com',
      port: '8042',
      authority: 'example.com:8042',
      path: '/over/there',
      query: 'name=ferret',
      fragment: 'nose'
    };
    expect(result).to.deep.equal(expectedResult);
  });

  it('should parse "http://example.com:8042/over/there?name=ferret&gender=male#nose" correctly', () => {
    const result = parseURI('http://example.com:8042/over/there?name=ferret&gender=male#nose');
    const expectedResult = {
      scheme: 'http',
      host: 'example.com',
      port: '8042',
      authority: 'example.com:8042',
      path: '/over/there',
      query: 'name=ferret&gender=male',
      fragment: 'nose'
    };
    expect(result).to.deep.equal(expectedResult);
  });

  it('should parse "http://example.com/over/there?name=ferret#nose" correctly', () => {
    const result = parseURI('http://example.com/over/there?name=ferret#nose');
    const expectedResult = {
      scheme: 'http',
      host: 'example.com',
      port: undefined,
      authority: 'example.com',
      path: '/over/there',
      query: 'name=ferret',
      fragment: 'nose'
    };
    expect(result).to.deep.equal(expectedResult);
  });

  it('should parse "urn:example:animal:ferret:nose" correctly', () => {
    const result = parseURI('urn:example:animal:ferret:nose');
    const expectedResult = {
      scheme: 'urn',
      host: undefined,
      port: undefined,
      authority: undefined,
      path: 'example:animal:ferret:nose',
      query: undefined,
      fragment: undefined
    };
    expect(result).to.deep.equal(expectedResult);
  });

  it('should parse "ftp://ftp.is.co.za/rfc/rfc1808.txt" correctly', () => {
    const result = parseURI('ftp://ftp.is.co.za/rfc/rfc1808.txt');
    const expectedResult = {
      scheme: 'ftp',
      host: 'ftp.is.co.za',
      port: undefined,
      authority: 'ftp.is.co.za',
      path: '/rfc/rfc1808.txt',
      query: undefined,
      fragment: undefined
    };
    expect(result).to.deep.equal(expectedResult);
  });

  it('should parse "ldap://[2001:db8::7]/c=GB?objectClass?one" correctly', () => {
    const result = parseURI('ldap://[2001:db8::7]/c=GB?objectClass?one');
    const expectedResult = {
      scheme: 'ldap',
      host: '[2001', // NA
      port: 'db8',   // NA
      authority: '[2001:db8::7]',
      path: '/c=GB',
      query: 'objectClass?one',
      fragment: undefined
    };
    expect(result).to.deep.equal(expectedResult);
  });
});
