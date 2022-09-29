// import Sequelize from "sequelize";
const { DataTypes } = require("sequelize");
const { sequelize } = require("../controllers/seed");

module.exports = {
  User: sequelize.define("user", {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    hashedPass: DataTypes.STRING,
  }),
};
