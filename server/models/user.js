const { DataTypes } = require("sequelize");
const { sequelize } = require("../controllers/seed");

module.exports = {
  users: sequelize.define("users", {
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
