'use strict';
const apiConfig = require('config').apiConfig;
const apiRequest = require('../api/ft');
const endpointName = '/search';
const aspects = 'article';

const endpoint = async (req, res, next) => {
  const { searchText } = req.query;
  try {
    console.debug(`search text: ${searchText}`);
    const headers = {
      'X-Api-Key': apiConfig.apiKey,
    };
    const body = {
      queryString: searchText,
      resultContext: {
        aspects: apiConfig.aspects,
        offset: 0,
        maxResults: 100,
      },
    };

    const apiResponse = await apiRequest.ftApi(
      apiConfig.apiUrl,
      body,
      headers,
      apiConfig.method
    );
    console.debug(`API response...`);
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

const isResultEmpty = (result) => {
  if (!result || !Array.isArray(result) || result.length === 0) return true;
  return false;
};

module.exports = { endpoint, endpointName };
