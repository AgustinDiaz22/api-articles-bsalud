const express = require("express");
var bodyParser = require('body-parser')
const mongoose = require("mongoose");

var moment = require('moment');
moment.locale('es');
// const Article = require('./routers/article.router')

// const app = express();
var app = require('./app');

mongoose.Promise = global.Promise;

var connections = new Array();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// SERVER
var port = process.env.PORT || 300;
var server = app.listen(port, function () {
    console.log(moment().format('YYYY-MM-DDTHH:mm:ssZ') + ' Server Funcionando en puerto ' + port);
});
// app.use('.')
function createConnection(name) {

    // CONEXIÓN CON ATLAS
    // var uri = 'mongodb://poscloud:elposcrece@' +
    // 'posproduction-shard-00-00-xjrx1.mongodb.net:27017,' +
    // 'posproduction-shard-00-01-xjrx1.mongodb.net:27017,' +
    // 'posproduction-shard-00-02-xjrx1.mongodb.net:27017/'+ name +
    // '?ssl=true&authSource=admin'; // ATLAS

    var uri = 'mongodb://localhost:27017/' + name;  // LOCAL

    var conn = getConnection(name);

    if (!conn) {
        console.log(moment().format('YYYY-MM-DDTHH:mm:ssZ') + " Creó conexión con base de datos " + name);
        conn = mongoose.createConnection(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        var connection = {
            name: name,
            conn: conn
        }
        connections.push(connection);
    }

    return conn;
}

function getConnection(name) {

    var conn = null;

    if (connections.length > 0) {
        for (var i = 0; i < connections.length; i++) {
            if (connections[i]["name"] === name) {
                conn = connections[i]["conn"];
            }
        }
    }

    return conn;
}

module.exports = createConnection('bsaludArticle');

module.exports.on = createConnection;