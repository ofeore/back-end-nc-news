const {
  selectArticles,
  selectArticlesById,
  selectCommentsByArticleId,
  insertCommentByArticleId,
  updateArticleVotesById,
} = require("../models/articles.model");

exports.getArticlesService = (sort_by, order, topic) => {
  return selectArticles(sort_by, order, topic).then((rows) => {
    if (topic && rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not found" });
    }
    return rows;
  });
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

exports.postCommentByArticleIdService = (article_id, newComment) => {
  const { username, body } = newComment;

  if (!username || !body) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  return selectArticlesById(article_id).then((articleRows) => {
    if (articleRows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not found" });
    }
    return insertCommentByArticleId(article_id, username, body);
  });
};

exports.patchArticleByIdService = (article_id, increment_votes) => {
  if (increment_votes === undefined) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  if (typeof increment_votes !== "number") {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  return updateArticleVotesById(article_id, increment_votes).then(
    (updatedArticle) => {
      if (!updatedArticle) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return updatedArticle;
    },
  );
};

exports.checkExists = (table, column, value) => {
  const queryStr = format("SELECT * FROM %I WHERE %I = $1;", table, column);

  return db.query(queryStr, [value]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not found" });
    }
  });
};
