'use strict';
const axios = require('axios');

const ftApi = async (
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
  ftApi
}