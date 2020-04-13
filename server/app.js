let express = require('express');
let app = express();

//write your logic here

let appService =  require('./app.service');

appService.connectToDatabase();
appService.setAppMiddleware(app);
appService.apiSetUp(app);

module.exports = app;