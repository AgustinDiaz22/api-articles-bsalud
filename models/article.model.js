'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
moment.locale('es');

const ArticleSchema = new Schema({
    idArticulo: { type: String },
    arNombre: { type: String },
    arDescripcion: { type: String },
    reason: { type: String },
    creationDate: { type: Date, default: moment().format('YYYY-MM-DDTHH:mm:ssZ')},
    operationType: { type: String, trim: true },
})

module.exports = ArticleSchema;