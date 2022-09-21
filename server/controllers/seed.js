//Database file

require("dotenv").config();

const { DATABASE, DATABASE_USERNAME, DATABASE_PASSWORD } = process.env;

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  DATABASE,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  {
    dialect: "postgres",
    pool: {
      max: 9,
      min: 0,
      idle: 10000,
    },
  }
);

module.exports = {
  sequelize,
};
