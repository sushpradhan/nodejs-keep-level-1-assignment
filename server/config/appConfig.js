// write your application configration here

const serverConfig = {
    port : 3000,
    hostname : '127.0.0.1'
}

const dbConfig = {
    mongoUrl : 'mongodb://localhost/keepLevel1'
}

module.exports = {
    serverConfig,
    dbConfig
}