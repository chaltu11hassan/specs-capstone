const { DataTypes } = require("sequelize");

const { sequelize } = require("../controllers/seed");

module.exports = {
  Post: sequelize.define("post", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    privateStatus: DataTypes.BOOLEAN,
  }),
};
