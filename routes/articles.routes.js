const express = require("express");
const { getArticles } = require("../controllers/articles.controller");

const router = express.Router();

router.get("/", getArticles);

module.exports = router;
