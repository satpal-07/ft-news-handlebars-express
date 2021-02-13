'use strict';
const express = require('express');
const handlebars = require('express-handlebars');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const router = require('./routes');
const path = require('path');
const { formatDate } = require('./utils/helper');

/**
 * Allowed methods
 */
const allowedMethods = ['GET', 'POST'];

// add static files
app.use(express.static(path.join(__dirname, '/public')));

// add compression middleware to compress the response bodies
app.use(compression());

// add helmet to secure the express server
app.use(
  helmet.referrerPolicy({
    policy: 'strict-origin-when-cross-origin', // Compliant
  })
);

// add json request parser
app.use(express.json());

// add json request parser
app.use(express.urlencoded({ extended: true }));

// middleware to block unused methods
app.use((req, res, next) => {
  if (!allowedMethods.includes(req.method)) {
    res.status(405).send({ message: 'Method is not supported' });
  } else {
    next();
  }
});

// logger middleware to log all the incoming requests and responses
app.use(
  morgan('combined', {
    format: 'default',
    stream: {
      write: function (str) {
        console.info(str);
      },
    },
    skip: function (req, res) {
      return false;
    },
  })
);

app.engine(
  'hbs',
  handlebars({
    defaultLayout: 'index',
    extname: '.hbs',
    helpers: {
      formatDate,
    },
  })
);

app.set('view engine', 'hbs');

// Assign the routes
app.use(router);

// This error handler will be used for throwing validation errors
app.use((err, req, res, next) => {
  console.error(`Error validating request parameters: ${err.message}`);
  res.status(400).json(err);
});

module.exports = app;
