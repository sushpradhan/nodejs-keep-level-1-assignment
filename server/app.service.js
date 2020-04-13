const bodyparser = require('body-parser');
const api = require('./api/v1');
const { serverConfig } = require('./config').appConfig;
const db = require('./db');

const connectToDatabase = () => {
    db.createMongoConnection();
    dbConnection = db.getMongoConnection();
};

const setAppMiddleware = (app) => {
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended : false}));
}

const apiSetUp = (app) => {
    app.use('/api/v1/',api);
}

module.exports = {
    connectToDatabase,
    setAppMiddleware,
    apiSetUp
}