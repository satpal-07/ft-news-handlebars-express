'use strict';
/**
 * Helper functions to format the provided date in en-US format
 * @param {String} date - date
 * @returns {String} - formatted date in en-US format
 */
const formatDate = (date) => {
  try {
    const dateObject = new Date(date);
    dateObject.getMon;
    return dateObject.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch (error) {
    console.error('Error in formatting the date: ' + error.message);
    return '';
  }
};

module.exports = { formatDate }
