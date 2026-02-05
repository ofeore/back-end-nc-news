const express = require("express");
const {
  getArticles,
  getArticlesById,
  getCommentsByArticleId,
} = require("../controllers/articles.controller");

const router = express.Router();

router.get("/", getArticles);
router.all("/", (req, res) => {
  res.status(405).send({ msg: "Method not allowed" });
});

router.get("/:article_id", getArticlesById);
router.all("/:article_id", (req, res) => {
  res.status(405).send({ msg: "Method not allowed" });
});

router.get("/:article_id/comments", getCommentsByArticleId);
router.all("/:article_id/comments", (req, res) => {
  res.status(405).send({ msg: "Method not allowed" });
});

module.exports = router;
