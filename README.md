## Environment Variables (.env files)

This project uses environment variables to connect to local PostgreSQL databases.  
Because `.env.*` files are ignored by Git, you will need to create them manually after cloning.

### 1) Create two .env files in the root directory

Create:

- `.env.development`
- `.env.test`

### 2) Add the database names

Add **exactly one line** to each file:

**.env.development**

PGDATABASE=nc_news

**.env.test**

PGDATABASE=nc_news_test

> These database names are created when you run `npm run setup-dbs`.

### 3) Make sure they are ignored by Git

Check your `.gitignore` includes:

- `.env.*`
