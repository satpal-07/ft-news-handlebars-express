'use strict';
const endpointName = '/';

/**
 * endpoint to handle to home page
 * @param {*} req - express request object
 * @param {*} res - express response object
 * @param {*} next - express next object
 */
const endpoint = async (req, res, next) => {
  res.render('home', {
    isHomeActive: true,
  });
};

module.exports = { endpoint, endpointName };
