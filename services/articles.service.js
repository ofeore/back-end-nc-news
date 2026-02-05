const {
  selectArticles,
  selectArticlesById,
  selectCommentsByArticleId,
} = require("../models/articles.model");

exports.getArticlesService = () => {
  return selectArticles();
};

exports.getArticlesByIdService = (article_id) => {
  return selectArticlesById(article_id).then((rows) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not found" });
    }
    return rows[0];
  });
};

exports.getCommentsByArticleIdService = (article_id) => {
  return selectArticlesById(article_id).then((articleRows) => {
    if (articleRows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not found" });
    }
    return selectCommentsByArticleId(article_id);
  });
};
