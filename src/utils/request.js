/**
 * Code based on
 * See: https://rjzaworski.com/2015/06/testing-api-requests-from-window-fetch
 * See: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
 * See: https://www.sitepoint.com/an-introduction-to-reasonably-pure-functional-programming/
 * See: https://github.com/mxstbr/react-boilerplate/blob/master/app/utils/request.js
 */

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
 * Handle response error.
 * Error objects sent to the catch handler without a response property, signal a
 * network failure that was never able to receive a response from the server.
 *
 * @param err
 *
 * @return {undefined} throws an error
 *
 * @see https://github.com/github/fetch/issues/257
 */
const handleResponseError = err => {
  // Re-throw with response status
  let response;
  if(err.response) {
    response = err.response;
  }
  else {
    // Server is down?
    response = {
      statusText: err.message ? err.message : '',
    };
  }

  const error = new Error(response.statusText);
  if(!response.status) {
    response.status = 500;
  }
  error.response = response;

  throw error;
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
  if (response.headers.get('Content-Type').indexOf('application/json') > -1) {
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
    .then(toContentType)
    .catch(handleResponseError);

export default request;
