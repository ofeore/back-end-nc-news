const db = require("../db/connection");
const format = require("pg-format");

exports.selectArticles = (sort_by = "created_at", order = "desc") => {
  const validSortColumns = [
    "article_id",
    "title",
    "author",
    "topic",
    "created_at",
    "votes",
    "comment_count",
  ];

  const validOrders = ["asc", "desc"];

  if (!validSortColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  if (!validOrders.includes(order.toLowerCase())) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  const queryStr = format(
    `
    SELECT 
      articles.author,
      articles.title,
      articles.article_id,
      articles.topic,
      articles.created_at,
      articles.votes,
      articles.article_img_url,
      COUNT(comments.comment_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments
      ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY %I %s;
    `,
    sort_by,
    order,
  );

  return db.query(queryStr).then(({ rows }) => rows);
};

exports.selectArticlesById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => rows);
};

exports.selectCommentsByArticleId = (article_id) => {
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`,
      [article_id],
    )
    .then(({ rows }) => rows);
};

exports.insertCommentByArticleId = (article_id, username, body) => {
  return db
    .query(
      ` INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`,
      [article_id, username, body],
    )
    .then(({ rows }) => rows[0]);
};

exports.updateArticleVotesById = (article_id, increment_votes) => {
  return db
    .query(
      ` UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,
      [increment_votes, article_id],
    )
    .then(({ rows }) => rows[0]);
};
