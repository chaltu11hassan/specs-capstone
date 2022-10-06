// const { Post } = require("../models/post");
const { User } = require("../models/user");
const { Comment } = require("../models/comments");

module.exports = {
  getComments: async (req, res) => {
    // console.log("comments");
    try {
      const comments = await Comment.findAll({
        where: { id: +req.params.postId },
        include: [
          {
            model: User,
            required: true,
            attributes: ["username"],
          },
        ],
      });
      res.status(200).send(comments);
    } catch (error) {
      console.log("Error in getComments");
      console.log(error);
      res.sendStatus(400);
    }
  },

  addComment: async (req, res) => {
    // console.log("add comment");
    try {
      const { content, userId, postId} = req.body;
      await Comment.create({
        content,
        userId,
        id: postId,
      });
      res.sendStatus(200);
    } catch (error) {
      console.log("error in adding comment");
      console.log(error);
      res.sendStatus(400);
    }
  },

  deleteComment: async (req, res) => {
    // console.log("delete comment");
    try {
      const { commentId } = req.params;
      console.log(commentId);
      await Comment.destroy({ where: { commentId: +commentId } });
      res.sendStatus(200);
    } catch (error) {
      console.log("error deleting comment");
      console.log(error);
      res.sendStatus(400);
    }
  },
};
