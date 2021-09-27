const ArticlesController = require('../controllers/article.controller');
const express = require('express')

const api = express.Router();

api.get("/all",ArticlesController.findAllArticles);
api.get("/allreason",ArticlesController.allreason);
api.post("/savereason",ArticlesController.savereason);
api.delete("/deletereason/:id",ArticlesController.deletereason);

module.exports = api;