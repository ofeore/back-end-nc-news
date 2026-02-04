const { selectArticles } = require("../models/articles.model");

exports.getArticlesService = () => {
  return selectArticles();
};
