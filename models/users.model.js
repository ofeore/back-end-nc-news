const db = require("../db/connection");

exports.selectUsers = () => {
  return db
    .query(`SELECT username, name, avatar_url FROM users;`)
    .then(({ rows }) => rows);
};
// Should:

// be available on /api/users.
// get all users.
// Responds with:

// an object with the key of users and the value of an array of objects. Each object should have the following properties:
// username
// name
// avatar_url
