const db = require("../connection");
const format = require("pg-format");
const createLookupObject = require("./utils/createLookupObject");

const seed = ({
  topicData,
  userData,
  articleData,
  commentData,
  userTopics,
}) => {
  return db
    .query(`DROP TABLE IF EXISTS user_topics;`)
    .then(() => db.query(`DROP TABLE IF EXISTS comments;`))
    .then(() => db.query(`DROP TABLE IF EXISTS articles;`))
    .then(() => db.query(`DROP TABLE IF EXISTS users;`))
    .then(() => db.query(`DROP TABLE IF EXISTS topics;`))

    .then(() => {
      return db.query(`
        CREATE TABLE topics (
          slug VARCHAR PRIMARY KEY,
          description VARCHAR NOT NULL,
          img_url VARCHAR(1000)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE users (
          username VARCHAR PRIMARY KEY,
          name VARCHAR NOT NULL,
          avatar_url VARCHAR(1000)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE articles (
          article_id SERIAL PRIMARY KEY,
          title VARCHAR NOT NULL,
          topic VARCHAR NOT NULL REFERENCES topics(slug),
          author VARCHAR NOT NULL REFERENCES users(username),
          body TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          votes INT DEFAULT 0,
          article_img_url VARCHAR(1000)
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE comments (
          comment_id SERIAL PRIMARY KEY,
          article_id INT NOT NULL REFERENCES articles(article_id),
          body TEXT NOT NULL,
          votes INT DEFAULT 0,
          author VARCHAR NOT NULL REFERENCES users(username),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE user_topics (
          user_topic_id SERIAL PRIMARY KEY,
          username VARCHAR NOT NULL REFERENCES users(username),
          topic VARCHAR NOT NULL REFERENCES topics(slug),
          UNIQUE (username, topic)
        );
      `);
    })

    .then(() => {
      const topicValues = topicData.map(({ slug, description, img_url }) => [
        slug,
        description,
        img_url,
      ]);

      const topicsInsertQuery = format(
        `INSERT INTO topics (slug, description, img_url) VALUES %L RETURNING *;`,
        topicValues,
      );

      return db.query(topicsInsertQuery);
    })

    .then(() => {
      const userValues = userData.map(({ username, name, avatar_url }) => [
        username,
        name,
        avatar_url,
      ]);

      const usersInsertQuery = format(
        `INSERT INTO users (username, name, avatar_url) VALUES %L RETURNING *;`,
        userValues,
      );

      return db.query(usersInsertQuery);
    })

    .then(() => {
      const articleValues = articleData.map(
        ({
          title,
          topic,
          author,
          body,
          created_at,
          votes,
          article_img_url,
        }) => [title, topic, author, body, created_at, votes, article_img_url],
      );

      const articleInsertQuery = format(
        `INSERT INTO articles (
      title, topic, author, body, created_at, votes, article_img_url
    ) VALUES %L RETURNING article_id, title;`,
        articleValues,
      );

      return db.query(articleInsertQuery);
    })
    .then(({ rows }) => {
      const articles = rows;

      const articleLookup = createLookupObject(articles, "title", "article_id");

      const commentValues = commentData.map(
        ({ article_title, body, votes, author, created_at }) => [
          articleLookup[article_title],
          body,
          votes,
          author,
          created_at,
        ],
      );

      const commentInsertQuery = format(
        `INSERT INTO comments (article_id, body, votes, author, created_at)
     VALUES %L RETURNING *;`,
        commentValues,
      );

      return db.query(commentInsertQuery);
    })
    .then(() => {
      const userTopicValues = userTopics.map(({ username, topic }) => [
        username,
        topic,
      ]);

      const userTopicsInsertQuery = format(
        `INSERT INTO user_topics (username, topic) VALUES %L RETURNING *;`,
        userTopicValues,
      );

      return db.query(userTopicsInsertQuery);
    });
};
module.exports = seed;
