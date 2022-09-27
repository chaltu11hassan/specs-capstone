const { DataTypes } = require("sequelize");

const { sequelize } = require("../controllers/seed");

const users = require("./user");

const posts = require("./post");

console.log(typeof users);

module.exports = {
  comments: sequelize.define("comments", {
    comment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    //these are not needed when using ORM
    
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: users,
    //     key: "user_id",
    //   },
    // },

    // post_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: posts,
    //     key: "post_id",
    //   },
    // },

    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    privateStatus: DataTypes.BOOLEAN,
  }),
};
