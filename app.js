const express = require("express");
const topicsRouter = require("./routes/topics.routes");
const articlesRouter = require("./routes/articles.routes");
const usersRouter = require("./routes/users.routes");

const app = express();

app.use(express.json());

app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);

app.all("/*path", (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    return res.status(400).send({ msg: "Bad request" });
  }

  if (err.status && err.msg) {
    return res.status(err.status).send({ msg: err.msg });
  }

  console.log(err);
  return res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;

// Description
// Should:

// be available on /api/articles/:article_id/comments.
// get all comments for an article.
// Responds with:

// an object with the key of comments and the value of an array of comments for the given article_id. Each comment should have the following properties:
// comment_id
// votes
// created_at
// author
// body
// article_id
// Comments should be served with the most recent comments first.

// Consider what errors could occur with this endpoint, and make sure to test for them.
