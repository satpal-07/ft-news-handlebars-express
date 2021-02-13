'use strict';
const ftApiConfig = require('config').ftApiConfig;
const { callAPI } = require('../api');
const endpointName = '/search';
const aspects = 'article';

/**
 * endpoint to handle to search
 * @param {*} req - express request object
 * @param {*} res - express response object
 * @param {*} next - express next object
 */
const endpoint = async (req, res, next) => {
  // get the search query
  const { searchText } = req.query;
  try {
    console.debug(`search text: ${searchText}`);
    // set up the FT API params
    const headers = {
      'X-Api-Key': ftApiConfig.apiKey,
    };
    const body = {
      queryString: searchText,
      resultContext: {
        aspects: ftApiConfig.aspects,
        offset: 0,
        maxResults: 100,
      },
    };

    const apiResponse = await callAPI(
      ftApiConfig.apiUrl,
      body,
      headers,
      ftApiConfig.method
    );

    // filter the result by extracting the articles only
    const filteredData = filter(apiResponse.results[0].results, 'article');
    res.render('seach-page', {
      data: filteredData,
      textInput: searchText,
      isResultEmpty: isResultEmpty(filteredData),
    });
  } catch (error) {
    console.error(`Error in search controller: ${error.message}`);
    res.render('home-error', {
      textInput: searchText,
    });
  }
};

/**
 * Filters the given data using the field
 * @param {Array} data - data to be filtered
 * @param {String} field - field to be used to filter
 * @returns {Array} filtered data
 */
const filter = (data, field) => {
  if (!data || !Array.isArray(data)) return [];
  try {
    const filteredData = data.filter((elem) => elem.aspectSet === field);
    return filteredData;
  } catch (error) {
    console.error(`Error while filtering the search result: ${error.message}`);
    return [];
  }
};

/**
 * Checks if the result is empty and returns true if empty else false
 *
 * @param {Array} result - result to be checked
 * @returns {Boolean} - true if result is empty else false
 */
const isResultEmpty = (result) => {
  if (!result || !Array.isArray(result) || result.length === 0) return true;
  return false;
};

module.exports = { endpoint, endpointName };
