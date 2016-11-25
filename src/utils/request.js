// Code based on
// See: https://rjzaworski.com/2015/06/testing-api-requests-from-window-fetch
// See: https://www.sitepoint.com/an-introduction-to-reasonably-pure-functional-programming/
// See: https://github.com/mxstbr/react-boilerplate/blob/master/app/utils/request.js

/**
 * Constructs an Error object
 *
 * @param response
 * @return {Error}
 */
const apiError = response => {
  const error = new Error(response.statusText);
  error.response = response;
  return error;
};

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response  A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
const checkResponse = response => {
  if (!response.ok) {
    throw apiError(response);
  }
  return response;
};

/**
 * Parses the response according to content type
 *
 * @param  {object} response A response from a network request
 *
 * @return {object} The parsed body from the request
 */
const toContentType = response => {
  if (response.headers.get('Content-Type') === 'application/json') {
    return response.json();
  }
  return response.text();
};

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
const request = (url, options) =>
  fetch(url, options)
    .then(checkResponse)
    .then(toContentType);

export default request;
