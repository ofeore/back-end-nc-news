const {
  getArticlesService,
  getArticlesByIdService,
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
