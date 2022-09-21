require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { SERVER_PORT } = process.env;
const { sequelize } = require("./controllers/seed");

//middleware


const app = express();
app.use(express.json());
app.use(cors());

//sequelize.sync({ force: true }) //drops tables if any exists
sequelize
  .sync()
  .then(() => {
    app.listen(SERVER_PORT, () => {
      console.log(`Server running on port ${SERVER_PORT}`);
    });
  })
  .catch((err) => console.log(err));
