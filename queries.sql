-- Making some queries to the database
-- Well done if you've got this far! You should have now confirmed that your databases are fully seeded.

-- You should now be able to make some queries to the databases. Import your connection into a new file and see if you can query the following data from your dev database, by running the file with node:

-- Get all of the users
-- Get all of the articles where the topic is coding
-- Get all of the comments where the votes are less than zero
-- Get all of the topics
-- Get all of the articles by user grumpy19
-- Get all of the comments that have more than 10 votes.

\c nc_news

\echo 'All users'
SELECT * FROM users;

\echo 'All articles where the topic is coding'
SELECT * FROM articles WHERE topic = 'coding';

\echo 'All of the comments where the votes are less than zero'
SELECT * FROM comments WHERE votes < 0;

\echo 'All of the topics'
SELECT DISTINCT topic FROM articles;

\echo 'All of the articles by user grumpy19'
SELECT * FROM articles WHERE author = 'grumpy19';

\echo 'All of the comments that have more than 10 votes'
SELECT * FROM comments WHERE votes > 10