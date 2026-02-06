const express = require("express");
const {
  getArticles,
  getArticlesById,
  getCommentsByArticleId,
  postCommentByArticleId,
  patchArticleById,
} = require("../controllers/articles.controller");

const router = express.Router();

router
  .route("/")
  .get(getArticles)
  .all((req, res) => {
    res.status(405).send({ msg: "Method not allowed" });
  });

router
  .route("/:article_id")
  .get(getArticlesById)
  .patch(patchArticleById)
  .all((req, res) => {
    res.status(405).send({ msg: "Method not allowed" });
  });

router
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId)
  .patch(patchArticleById)
  .all((req, res) => {
    res.status(405).send({ msg: "Method not allowed" });
  });

module.exports = router;
