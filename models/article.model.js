'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const ArticleSchema = new Schema({
    idArticle: { type: String },
    name: { type: String },
    description: { type: String },
    movement: {type: String},
    creationDate: {type: Date},
    operationType: { type: String, trim: true },
})

module.exports = ArticleSchema;