'use strict'
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

async function allMovement(req, res, next) {
    initConnectionDB('bsaludArticle')

    Article.find({ "operationType": { "$ne": "D" } }).then(r => {
        return res.status(200).send(r);
    })
}
async function deleteMovement(req, res, next) {
    var articleId = req.params.id
    Article.findByIdAndUpdate(articleId,
        {
            $set: {
                operationType: 'D'
            }
        },
        (async (err, r) => {
            if (r) {
                return res.status(200).send({ message: 'Movimiento eliminado', status: 200, res: r })
            } else if (err) {
                return res.status(500).send({ message: 'error al eliminar', status: 500, err: err})
            }

        }))

}
async function saveMovement(req, res, next) {
    initConnectionDB('bsaludArticle')

    let params = req.body.body
    let article = new Article();
    article.idArticle = params.idArticulo
    article.name = params.arNombre
    article.description = params.arDescripcion
    article.movement = params.movement

    article.creationDate = moment().format('YYYY-MM-DDTHH:mm:ssZ');
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
    saveMovement,
    allMovement,
    deleteMovement
};