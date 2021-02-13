'use strict';
const axios = require('axios');

/**
 * Calls the given API and its params
 * @param {String} url - url of the FT API
 * @param {Object} body - Body of the API
 * @param {Object} headers - API headers
 * @param {String} method - API method type i.e. get, post ...
 * @returns {Object} - data returned by the API
 */
const callAPI = async (
  url,
  body,
  headers,
  method
) => {
  try {
    let requestOptions = initRequestParams(url, body, headers, method);
    let result = await axios(requestOptions);
    console.log(`API call returned following status code: ${result.status}`);
    return result.data;
  } catch (error) {
    console.log(`Error in making api call: ${error.message}`);
    throw new Error('Error in calling API');
  }
}

/**
 * Helper function to initialise the request parameters
 * @param {String} url - url of the FT API
 * @param {Object} body - Body of the API
 * @param {Object} headers - API headers
 * @param {string} [method='get']
 * @param {string} [contentType='application/json']
 * @returns {Object} - initialise Request parameters
 */
const initRequestParams = (url, body, headers, method='get', contentType = 'application/json') => {
  return {
    method: method,
    url: encodeURI(url),
    data: body,
    headers: {
      'Content-Type': contentType,
      ...headers
    },
  }
}



module.exports = {
  callAPI
}