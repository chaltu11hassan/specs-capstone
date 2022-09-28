const { DataTypes } = require("sequelize");
const { sequelize } = require("../controllers/seed");
// const users = require("./user");
// const posts = require("./post");

console.log(typeof users);

module.exports = {
  comments: sequelize.define("comments", {
    commentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    //these are not needed when using ORM

    // userId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: users,
    //     key: "userId",
    //   },
    // },

    // postId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: posts,
    //     key: "postId",
    //   },
    // },

    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    privateStatus: DataTypes.BOOLEAN,
  }),
};
