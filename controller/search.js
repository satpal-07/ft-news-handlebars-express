'use strict';
const ftApiConfig = require('config').ftApiConfig;
const { callAPI } = require('../api');
const endpointName = '/search';
const maxResults = 25;

/**
 * endpoint to handle to search
 * @param {*} req - express request object
 * @param {*} res - express response object
 * @param {*} next - express next object
 */
const endpoint = async (req, res, next) => {
  // get the search query
  const { searchText, page = 1, activeLink } = req.query;
  try {
    const pageNum = Number(page);
    console.debug(`search text: ${searchText}`);
    // set up the FT API params
    const headers = {
      'X-Api-Key': ftApiConfig.apiKey,
    };
    // calculate the offset
    const offset = calculateOffset(pageNum - 1);
    const body = {
      queryString: searchText,
      resultContext: {
        aspects: ftApiConfig.aspects,
        offset: offset,
        maxResults,
      },
    };

    const apiResponse = await callAPI(
      ftApiConfig.apiUrl,
      body,
      headers,
      ftApiConfig.method
    );

    // extract the result
    const apiResult = getResult(apiResponse);
    const articleResult = apiResult.results;
    const totalResult = apiResult.indexCount;
    // calculate the total page number
    const totalPage = calculateTotalPage(totalResult);

    const prevPageNumber = getPrevPageNumber(pageNum);
    const nextPageNumber = getNextPageNumber(pageNum, totalPage);
    const isPrevButtonVisible = pageNum > 1;
    const isNextButtonVisible = nextPageNumber < totalPage;
    const resultFrom = calculateResultFrom(offset);
    const resultTo = calculateResultTo(offset);

    const activeNavLink = getActiveNavLink(activeLink);

    res.render('seach-page', {
      data: articleResult,
      textInput: searchText,
      isResultEmpty: isResultEmpty(articleResult),
      totalPage,
      isPrevButtonVisible,
      isNextButtonVisible,
      prevPageNumber,
      nextPageNumber,
      currentPage: pageNum,
      totalResult,
      resultFrom,
      resultTo,
      ...activeNavLink,
    });
  } catch (error) {
    console.error(`Error in search controller: ${error.message}`);
    res.render('home-error', {
      textInput: searchText,
    });
  }
};

/**
 * Calculates the total page numbers to be displayed on the search page
 * @param {Number} totalArticleCount - number of total article
 * @returns {Number} - total page count
 */
const calculateTotalPage = (totalArticleCount) => {
  if (isNaN(totalArticleCount)) return 0;
  return Math.round(totalArticleCount / maxResults);
};

/**
 * Calculates the offset based on the page number provided
 * @param {Number} pageNumber - page number
 * @returns {Number} - offset
 */
const calculateOffset = (pageNumber) => {
  // return zero when page number is not a number or less than 2
  if (isNaN(pageNumber) || pageNumber < 1) return 0;
  return Math.round(pageNumber * maxResults) + 1;
};

/**
 * Returns the next page number
 * @param {Number} pageNum - current page number
 * @param {Number} totalPageNum - total page number
 * @returns {Number} - next page number
 */
const getNextPageNumber = (pageNum, totalPageNum) => {
  return totalPageNum === pageNum ? 0 : pageNum < 0 ? 2 : pageNum + 1;
};

/**
 * Returns the previous page number
 * @param {Number} pageNum - current page number
 * @returns {Number} - previous page number
 */
const getPrevPageNumber = (pageNum) => {
  return pageNum < 0 ? 1 : pageNum - 1;
};

/**
 * Calculates the result from number
 * @param {Number} offset - API offset
 * @returns {Number} - result from number
 */
const calculateResultFrom = (offset) => {
  return offset === 0 ? 1 : offset;
};

/**
 * Calculates the result to number
 * @param {Number} offset - API offset
 * @returns {Number} - result to number
 */
const calculateResultTo = (offset) => {
  return offset === 0 ? offset + maxResults : offset + maxResults - 1;
};

/**
 * Extracts result from API response
 * @param {Array} apiResponse - API response
 * @returns {Array} result
 */
const getResult = (apiResponse) => {
  try {
    if (
      !apiResponse ||
      !apiResponse.results ||
      !Array.isArray(apiResponse.results) ||
      apiResponse.results.length === 0
    )
      return [];
    return apiResponse.results[0];
  } catch (error) {
    console.error(
      `Error while getting the result from the api response: ${error.message}`
    );
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

/**
 * Responsible for identifying which nav link to show as active
 * @param {String} item - nav link to be made active
 * @returns {Object} - list of boolean
 */
const getActiveNavLink = (item) => {
  const activeNavLink = {
    isBrexitLinkActive: item === 'brexit' ? true : false,
    isEuropeLinkActive: item === 'eu' ? true : false,
    isTechnologyLinkActive: item === 'tech' ? true : false,
    isCovidLinkActive: item === 'covid' ? true : false,
    isCryptoLinkActive: item === 'crypto' ? true : false,
    isAsiaLinkActive: item === 'asia' ? true : false,
    isScienceLinkActive: item === 'science' ? true : false,
  };
  let isSearchLinkActive = true;
  // if none of the links are active then make search active
  for(const link of Object.values(activeNavLink)) {
    if(link){
      isSearchLinkActive = false;
      break;
    }
  }
  activeNavLink.isSearchLinkActive = isSearchLinkActive;
  return activeNavLink;
};

module.exports = { endpoint, endpointName };
