const { DataTypes } = require("sequelize");
const { sequelize } = require("../controllers/seed");

// const users = require("./user");

module.exports = {
  posts: sequelize.define("posts", {
    post_id: {
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
    //     // key: "user_id",
    //   },
    // },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    privateStatus: DataTypes.BOOLEAN,
  }),
};
