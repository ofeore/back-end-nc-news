const { selectUsers } = require("../models/users.model");

exports.getUsersService = () => {
  return selectUsers();
};
