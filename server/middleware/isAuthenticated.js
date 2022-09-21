require("dotenv").config();

const { SECRET } = process.env;

const jwt = require("jsonwebtoken");

module.exports = {
  //check authentication then handle req/res
  isAuthenticated: (req, res) => {
    const headerToken = req.get("authorization");

    if (!headerToken) {
      res.sendStatus(401);
      console.log("ERROR IN auth middleware");
    }

    //verify token exists and if not verified send error
    let token;

    try {
      token = jwt.verify(headerToken, SECRET);
    } catch (error) {
      error.statusCode = 500;
      throw error;
    }

    //if there is no token at all, then dont log in or authenticate
    if (!token) {
      const error = new Error("Not authenticated!");
      error.statusCode = 401;
      throw error;
    }

    //if authenticated then send them to the next page?
    next();
  },
};
