const { posts } = require("../models/post");
const { users } = require("../models/user");


module.exports = {
  viewAllPosts: async (req, res) => {
    // console.log("posts");
    try {
      const posts = await posts.findAll({
        where: { privateStatus: false },
        // include: [
        //   {
        //     model: users,
        //     required: true,
        //     attributes: ["username"],
        //   },
        // ],
      });
      // console.log(posts);
      res.status(200).send(posts);
    } catch (error) {
      console.log(error);
      console.log("Error in viewAllPosts");
      res.sendStatus(400);
    }
  },
  viewCurrentPosts: async (req, res) => {
    console.log("current posts", req.params);
    try {
      const posts = await posts.findAll({
        where: { user_id: req.params.userId },
        include: [{ model: users, required: true, attributes: ["username"] }],
      });
      res.status(200).send(posts);
      // console.log(posts);
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
      await posts.create({ title, content, privateStatus: status, userId });
      ////////////////////////////////////////////////////////////////
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
      await posts.update({ privateStatus: status }, { where: { id: +id } });
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
      await posts.destroy({ where: { id: +id } });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      console.log("error deleting post");
      res.sendStatus(400);
    }
  },
};
