/**
 * Parse URI
 *  The following are two example URIs and their component parts:
 *
 *   http://example.com:8042/over/there?name=ferret#nose
 *   \__/   \______________/\_________/ \_________/ \__/
 *   |           |            |            |        |
 *   scheme    authority     path        query   fragment
 *   |    ____________________|___
 *   / \ /                        \
 *   urn:example:animal:ferret:nose
 *
 * @see https://stackoverflow.com/questions/6168260/how-to-parse-a-uri
 * @see http://www.ietf.org/rfc/rfc3986.txt
 * @param uri The uri to parse
 * @return {{scheme: string, host: string, port: string, authority: string, path: string, query: string, fragment: string}}
 * @author Leif Olsen
 * @example
 * // parseURI("http://www.somesite.com:80/web/page?a=1&b=2"))
 * // returns
 * // {
 * //   scheme: 'http',
 * //   host: 'www.somesite.com',
 * //   port: '80',
 * //   authority: 'www.somesite.com:80',
 * //   path: '/web/page',
 * //   query: 'a=1&b=2',
 * //   fragment: undefined
 * // }
 */
const parseURI = uri => {
  const pattern = new RegExp('^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?');
  const matches = uri.match(pattern);
  const [ host = undefined, port = undefined ] = matches[4] ? matches[4].split(':') : [undefined, undefined]; // authority, e.g. localhost:80
  return {
    scheme: matches[2],
    host: host,
    port: port,
    authority: matches[4],
    path: matches[5],
    query: matches[7],
    fragment: matches[9]
  };
};

export default parseURI;
