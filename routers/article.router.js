const ArticlesController = require('../controllers/article.controller');
const express = require('express')

const api = express.Router();

api.get("/all",ArticlesController.findAllArticles);
api.get("/allMovement",ArticlesController.allMovement);
api.post("/saveMovement",ArticlesController.saveMovement);
api.delete("/deleteMovement/:id",ArticlesController.deleteMovement);


module.exports = api;