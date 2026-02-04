const express = require("express");
const topicsRouter = require("./routes/topics.routes");
const articlesRouter = require("./routes/articles.routes");
const usersRouter = require("./routes/users.routes");

const app = express();

app.use(express.json());

app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = app;

// CORE: GET /api/articles/:article_id
// If you have gotten to this point you will need to begin testing for potential errors. If we haven't had the lecture yet you may find the notes helpful.

// Description
// Should:

// be available on /api/articles/:article_id.
// get an article by its id.
// Responds with:

// an object with the key of article and the value of an article object, which should have the following properties:
// author
// title
// article_id
// body
// topic
// created_at
// votes
// article_img_url
// Consider what errors could occur with this endpoint, and make sure to test for them. As this is your first endpoint that could error,
// you may wish to also consider any general errors that could occur when making any type of request to your api. The errors that you identify should be fully tested for.

// Note: although you may consider handling a 500 error in your app, we would not expect you to explicitly test for this.
