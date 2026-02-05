//test each endpoint here
const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
require("jest-sorted");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("Invalid Endpoint", () => {
  test("404: Responds with a message when a path is invalid", () => {
    return request(app)
      .get("/api/invalid-path")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path not found");
      });
  });
});

describe("GET /api/topics", () => {
  test("200: returns all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.topics)).toBe(true);
        expect(body.topics.length).toBeGreaterThan(0);

        body.topics.forEach((topic) => {
          expect(topic).toHaveProperty("slug");
          expect(topic).toHaveProperty("description");
        });
      });
  });
});

describe("GET /api/articles", () => {
  test("200: returns all articles sorted in descending order by date", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.articles)).toBe(true);
        expect(body.articles).toBeSortedBy("created_at", { descending: true });

        body.articles.forEach((article) => {
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("votes");
          expect(article).toHaveProperty("article_img_url");
          expect(article).toHaveProperty("comment_count");

          expect(article).not.toHaveProperty("body");
        });
      });
  });
});

describe("GET /api/users", () => {
  test("200: returns all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.users)).toBe(true);
        expect(body.users.length).toBeGreaterThan(0);

        body.users.forEach((users) => {
          expect(users).toHaveProperty("username");
          expect(users).toHaveProperty("name");
          expect(users).toHaveProperty("avatar_url");
        });
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: returns full article object for any existing article_id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toHaveProperty("author");
        expect(body.article).toHaveProperty("title");
        expect(body.article).toHaveProperty("article_id", 1);
        expect(body.article).toHaveProperty("topic");
        expect(body.article).toHaveProperty("body");
        expect(body.article).toHaveProperty("created_at");
        expect(body.article).toHaveProperty("votes");
        expect(body.article).toHaveProperty("article_img_url");
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: returns all the comments for a particular article", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.comments)).toBe(true);

        body.comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id");
          expect(comment).toHaveProperty("votes");
          expect(comment).toHaveProperty("created_at");
          expect(comment).toHaveProperty("author");
          expect(comment).toHaveProperty("body");
          expect(comment).toHaveProperty("article_id", 1);
        });

        expect(body.comments).toBeSortedBy("created_at", { descending: true });
      });
  });

  test("400: responds with Bad request when article_id is invalid", () => {
    return request(app)
      .get("/api/articles/banana/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("405: responds with Method not allowed for unsupported methods", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({})
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).toBe("Method not allowed");
      });
  });

  test("404: responds with Not found when article_id does not exist", () => {
    return request(app)
      .get("/api/articles/999999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});

// CORE: GET /api/articles/:article_id/comments
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
