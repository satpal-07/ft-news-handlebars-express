'use strict';
const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});
const search = require('../controller/search');
const home = require('../controller/home');

/**
 * @description home endpoint handler
 */
router.get(home.endpointName, home.endpoint);

/**
 * @description search endpoint handler
 */
router.get(search.endpointName, search.endpoint);

/**
 * Not Found endpoint exception handling.
 */
router.all('*', function (req, res) {
  res.render('not-found');
});

module.exports = router;