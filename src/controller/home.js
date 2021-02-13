'use strict';
const endpointName = '/';

const endpoint = async (req, res, next) => {
  res.render('home', {
    isNavActive: true,
  });
};

module.exports = { endpoint, endpointName };
