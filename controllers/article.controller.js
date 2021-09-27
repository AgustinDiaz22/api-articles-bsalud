'use strict'
// categoria de producota ´para poder editar 
const mongoose = require('mongoose');


const config = require("../config");
const sqlConnection = require("../sql");
const sql = new sqlConnection(config.config);
var moment = require('moment');
moment.locale('es');
var Article;

async function findAllArticles(req, res, next) {

    let articles = await sql.getArticle()
    return res.send(articles.recordset)

}

async function allreason(req, res, next) {
    initConnectionDB('bsaludArticle')

    let match
    if (req.query) {
        match = req.query.match
    } else {
        match = { "operationType": { "$ne": "D" } }
    }
    match = JSON.parse(match)
    Article.find(match,{}, {sort: {creationDate: 1}}).then(r => {
        return res.status(200).send(r);
    })
}
async function deletereason(req, res, next) {
    var articleId = req.params.id
    Article.findByIdAndUpdate(articleId,
        {
            $set: {
                operationType: 'D'
            }
        },
        (async (err, r) => {
            if (r) {
                return res.status(200).send({ message: 'Motivo eliminado', status: 200, res: r })
            } else if (err) {
                return res.status(500).send({ message: 'error al eliminar', status: 500, err: err })
            }

        }))

}
async function savereason(req, res, next) {
    initConnectionDB('bsaludArticle')
    let params = req.body.body
    let article = new Article();
    article.idArticulo = params.idArticulo
    article.arNombre = params.arNombre
    article.arDescripcion = params.arDescripcion
    article.reason = params.reason

    article.creationDate = moment().format('YYYY-MM-DDT12:00')
    article.operationType = 'C';

    article.save((err, articleSave) => {
        if (err) {
            return res.status(500).send({ message: 'Error al guardar', status: 500, err: err });
        } else {
            return res.status(200).send({ message: 'Movimiento guardado', status: 200, save: articleSave });
        }
    })


}

function initConnectionDB(database) {

    const Model = require('../models/model');

    var ArticleSchema = require('../models/article.model');
    Article = new Model('article', {
        schema: ArticleSchema,
        connection: database
    });
}
module.exports = {
    findAllArticles,
    savereason,
    allreason,
    deletereason
};