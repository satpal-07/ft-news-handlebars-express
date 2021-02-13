'use strict';
const appConfig = require('config').app;
const app = require('./app');

// create server
app.listen(appConfig.port, function () {
  console.log(
    `The ${appConfig.serviceName} service is now running on port ${appConfig.port}`
  );
});