NC News API

The API is hosted on Render:

https://back-end-nc-news-71fp.onrender.com/

You can visit this link in the browser to confirm the server is running.
Endpoints follow a RESTful structure (e.g. /api, /api/articles, etc.).

## Project Summary

NC News backend is a RESTful API built with Node.js, Express, and PostgreSQL.

It provides access to news articles, topics, users, and comments, allowing clients to:

- Retrieve articles and topics

- Filter and sort articles

- Post and delete comments

- Update article vote counts

This project was created as part of the Northcoders Backend curriculum and follows MVC architecture, with full test coverage using Jest and Supertest.

## Tech Stack

- Node.js

- Express

- PostgreSQL

- Jest & Supertest

- dotenv

- pg

## Minimum Requirements

Node.js: v18.0.0 or higher

PostgreSQL: v14 or higher

You can check your versions with:

```
node --version
psql --version
```

## Getting Started Locally

1. Clone the Repository

```
git clone https://github.com/ofeore/back-end-nc-news.git
cd back-end-nc-news
```

2. Install Dependencies

```
npm install
```

### Environment Variables

This project uses environment variables to connect to local PostgreSQL databases.

Because .env.\* files are ignored by Git, you will need to create them manually.

Create two .env files in the root directory:

.env.development

.env.test

Add exactly one line to each file:

.env.development

```
PGDATABASE=nc_news
```

.env.test

```
PGDATABASE=nc_news_test
```

These database names are created automatically when running the setup scripts.

### Database setup and seeding

1. Create the databases:

```
npm run setup-dbs
```

2. Seed the development database:

```
npm run seed
```

### Running Tests

To run the full test suite:

```
npm test
```

Tests use the test database and will not affect development data.

## Running the Server

Development mode (with auto-reload):

```
npm run dev
```

Production mode:

```
npm start
```

The server will run locally on:

http://localhost:9090

## API Endpoints

All endpoints are prefixed with /api

GET /api lists all available endpoints

### Topics

Get all topics:

```
GET	/api/topics
```

### Articles

Get all articles (supports sorting, ordering & filtering):

```
GET /api/articles
```

Query options for /api/articles:

- sort_by (e.g. created_at, votes)

- order (asc or desc)

- topic (filter by topic)

Get a single article by ID:

```
GET /api/articles/:article_id
```

Update an article’s vote count:

```
PATCH /api/articles/:article_id
```

### Comments

Get comments for an article:

```
GET /api/articles/:article_id/comments
```

Add a comment to an article:

```
POST /api/articles/:article_id/comments
```

Delete a comment by ID:

```
DELETE /api/comments/:comment_id
```

### Users

Get all users:

```
GET /api/users
```

### Notes

All responses are in JSON.

Invalid routes and requests return appropriate HTTP status codes.

Full error handling is implemented.

## Project Structure

```
.
├── __tests__/
├── controllers/
├── db/
├── models/
├── routes/
├── services/
├── .env.development
├── .env.test
├── app.js
├── listen.js
├── package.json
└── README.md

```
