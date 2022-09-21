const { User } = require("../models/user");
const { Post } = require("../models/post");

module.exports = {
  viewAllPosts: async (req, res) => {
    console.log("posts");
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
      res.status(200).send(posts);
    } catch (error) {
      console.log(error);
      console.log("Error in viewAllPosts");
      res.sendStatus(400);
    }
  },
  viewCurrentPosts: async (req, res) => {
    console.log("current posts");
    try {
      const posts = await Post.findAll({
        where: { privateStatus: true },
        include: [{ model: User, required: true, attributes: ["username"] }],
      });
      res.status(200).send(posts);
    } catch (error) {
      console.log(error);
      console.log("Error in viewCurrentPosts");
      res.sendStatus(400);
    }
  },

  addNewPost: async (req, res) => {
    console.log("add post");
    try {
      const { title, content, status, userId } = req.body;
      await Post.create({ title, content, privateStatus: status, userId });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      console.log("error in adding post");
      res.sendStatus(400);
    }
  },

  editPost: async (req, res) => {
    console.log("edit post");
    try {
      const { id } = req.params;
      const { status } = req.body;
      await Post.update({ privateStatus: status }, { where: { id: +id } });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      console.log("error editing post");
      res.sendStatus(400);
    }
  },

  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      await Post.destroy({ where: { id: +id } });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      console.log("error deleting post");
      res.sendStatus(400);
    }
  },
};
