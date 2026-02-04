const { fetchTopics } = require("../models/topics.model");

exports.getTopicsService = () => {
  return fetchTopics();
};
