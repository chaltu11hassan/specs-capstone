require("dotenv").config();

const { SECRET } = process.env;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { restart } = require("nodemon");
const { useFetcher } = require("react-router-dom");

const { User } = require("../models/user");

const createToken = (username, id) => {
  return jwt.sign({ username, id }, { SECRET }, { expiresIn: "2 days" });
};

module.exports = {
  register: async (req, rrs) => {
    console.log("register");
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
          newUser.dataValues.id
        );
        console.log("TOKEN", token);
        const expirationTime = Date.now() + 1000 * 60 * 60 * 24;

        res.status(200).send({
          username: newUser.dataValues.username,
          userId: newUser.dataValues.id,
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
            userFound.dataValues.id
          );
          const expirationTime = Date.now() + 1000 * 60 * 60 * 24;
          res.status(200).send({
            username: userFound.dataValues.username,
            userId: userFound.dataValues.id,
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
