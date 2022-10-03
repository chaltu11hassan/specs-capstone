const { DataTypes } = require("sequelize");
const { sequelize } = require("../controllers/seed");

// console.log(typeof User);

module.exports = {
  Comment: sequelize.define("comment", {
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
    //     model: User,
    //     key: "userId",
    //   },
    // },

    id: {
      type: DataTypes.INTEGER,
    },

   
    content: DataTypes.TEXT,
    privateStatus: DataTypes.BOOLEAN,
  }),
};
