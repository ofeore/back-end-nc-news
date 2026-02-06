const express = require("express");
const { deleteCommentById } = require("../controllers/comments.controller");

const router = express.Router();

router.delete("/:comment_id", deleteCommentById);

router.all("/:comment_id", (req, res) => {
  res.status(405).send({ msg: "Method not allowed" });
});

module.exports = router;
