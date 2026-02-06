const { removeCommentById } = require("../models/comments.model");

exports.deleteCommentByIdService = (comment_id) => {
  return removeCommentById(comment_id).then((deletedRow) => {
    if (!deletedRow) {
      return Promise.reject({ status: 404, msg: "Not found" });
    }
  });
};
