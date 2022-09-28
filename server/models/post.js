const { DataTypes } = require("sequelize");
const { sequelize } = require("../controllers/seed");

// const users = require("./user");

module.exports = {
  posts: sequelize.define("posts", {
    postId: {
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
    //     // key: "userId",
    //   },
    // },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    privateStatus: DataTypes.BOOLEAN,
  }),
};
