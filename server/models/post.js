const { DataTypes } = require("sequelize");
const { sequelize } = require("../controllers/seed");

module.exports = {
  Post: sequelize.define("post", {
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
    //     model: User,
    //     // key: "userId",
    //   },
    // },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    privateStatus: DataTypes.BOOLEAN,
  }),
};
