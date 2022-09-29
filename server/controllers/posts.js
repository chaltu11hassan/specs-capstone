const { Post } = require("../models/post");
const { User } = require("../models/user");

module.exports = {
  viewAllPosts: async (req, res) => {
    // console.log("posts");
    try {
      const posts = await Post.findAll({
        where: { privateStatus: false },
        include: [
          {
            model: User,
            required: true,
            attributes: ["username"],
          },
        ],
      });
      console.log(posts);
      res.status(200).send(posts);
    } catch (error) {
      console.log("Error in viewAllPosts");
      console.log(error);
      res.sendStatus(400);
    }
  },

  viewCurrentPosts: async (req, res) => {
    console.log("current posts", req.params);
    try {
      const posts = await Post.findAll({
        where: { userId: +req.params.userId },
        // where: { privateStatus: true },
        include: [
          {
            model: User,
            required: true,
            attributes: ["username"],
          },
        ],
      });
      res.status(200).send(posts);
      // console.log(posts);
    } catch (error) {
      console.log("Error in viewCurrentPosts");
      console.log(error);
      res.sendStatus(400);
    }
  },

  addNewPost: async (req, res) => {
    // console.log("add post");
    try {
      const { title, content, status, userId } = req.body;
      await Post.create({
        title,
        content,
        privateStatus: status,
        userId: +userId,
      });
      res.sendStatus(200);
    } catch (error) {
      console.log("error in adding post");
      console.log(error);
      res.sendStatus(400);
    }
  },

  editPost: async (req, res) => {
    // console.log("edit post");
    try {
      const { postId } = req.params;
      const { status } = req.body;
      await Post.update(
        { privateStatus: status },
        { where: { postId: +postId } }
      );
      res.sendStatus(200);
    } catch (error) {
      console.log("error editing post");
      console.log(error);
      res.sendStatus(400);
    }
  },

  deletePost: async (req, res) => {
    // console.log("delete post");
    try {
      const { postId } = req.params;
      await Post.destroy({ where: { postId: +postId } });
      res.sendStatus(200);
    } catch (error) {
      console.log("error deleting post");
      console.log(error);
      res.sendStatus(400);
    }
  },
};
