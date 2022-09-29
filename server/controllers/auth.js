require("dotenv").config();

const { SECRET } = process.env;

const { User } = require("../models/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { restart } = require("nodemon");

const createToken = (username, id) => {
  return jwt.sign({ username, id }, SECRET, { expiresIn: "2 days" });
};

module.exports = {
  register: async (req, res) => {
    console.log("register", SECRET);
    try {
      const { username, password } = req.body;
      let userFound = await User.findOne({ where: { username } });
      if (userFound) {
        res.status(400).send("cannot create new account");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await User.create({ username, hashedPass: hash });
        const token = createToken(
          newUser.dataValues.username,
          newUser.dataValues.userId
        );
        console.log("TOKEN", token);
        const expirationTime = Date.now() + 1000 * 60 * 60 * 48;
        console.log(newUser.dataValues);
        res.status(200).send({
          username: newUser.dataValues.username,
          userId: newUser.dataValues.userId,
          token,
          expirationTime,
        });
      }
    } catch (error) {
      console.log("Error in registration");
      console.log(error);
      res.sendStatus(400);
    }
  },

  login: async (req, res) => {
    console.log("login");
    try {
      const { username, password } = req.body;
      let userFound = await User.findOne({ where: { username } });
      if (userFound) {
        const isAuthenticated = bcrypt.compareSync(
          password,
          userFound.hashedPass
        );
        if (isAuthenticated) {
          const token = createToken(
            userFound.dataValues.username,
            userFound.dataValues.userId
          );
          const expirationTime = Date.now() + 1000 * 60 * 60 * 48;
          res.status(200).send({
            username: userFound.dataValues.username,
            userId: userFound.dataValues.userId,
            token,
            expirationTime,
          });
        } else {
          res.status(400).send("Unable to login");
        }
      } else {
        res.status(400).send("Unable to login");
      }
    } catch (erro) {
      console.log(error);
      console.log("Error in login");
      res.sendStatus(400);
    }
  },
};
