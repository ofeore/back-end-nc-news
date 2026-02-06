const { deleteCommentByIdService } = require("../services/comments.service");

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;

  deleteCommentByIdService(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
