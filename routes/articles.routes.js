const express = require("express");
const {
  getArticles,
  getArticlesById,
  getCommentsByArticleId,
  postCommentByArticleId,
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

router
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId)
  .all((req, res) => {
    res.status(405).send({ msg: "Method not allowed" });
  });

module.exports = router;
