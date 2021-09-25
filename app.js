//aca todo express
'use strict'

var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');

var articleRoutes = require('./routers/article.router');


//clientes


//var app = express()
var app = express().use("*", cors());

//app.use(bodyparser.urlencoded({ extended: false }));
//app.use(bodyparser.json());

app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

var originsWhitelist = [
    'http://localhost:4200',      //this is my front-end url for development
    'http://www.myproductionurl.com'
];
var corsOptions = {
    origin: function (origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
}
//app.use(cors(corsOptions));

app.set('trust proxy', true);

/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization, Database');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});*/

app.use('/api',
    articleRoutes);

module.exports = app;