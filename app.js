const express = require("express");
const path = require("path");
const topicsRouter = require("./routes/topics.routes");
const articlesRouter = require("./routes/articles.routes");
const usersRouter = require("./routes/users.routes");
const commentsRouter = require("./routes/comments.routes");

const app = express();

app.use(express.json());

app.use("/api", express.static(path.join(__dirname, "public")));

app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);
app.use("/api/comments", commentsRouter);

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
