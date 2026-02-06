const {
  getArticlesService,
  getArticlesByIdService,
  getCommentsByArticleIdService,
  postCommentByArticleIdService,
  patchArticleByIdService,
} = require("../services/articles.service");

exports.getArticles = (req, res, next) => {
  getArticlesService()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;

  getArticlesByIdService(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;

  getCommentsByArticleIdService(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  postCommentByArticleIdService(article_id, { username, body })
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { increment_votes } = req.body;

  patchArticleByIdService(article_id, increment_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
