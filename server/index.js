require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { SERVER_PORT } = process.env;
const { sequelize } = require("./controllers/seed");
const { User } = require("./models/user");
const { Post } = require("./models/post");


const { isAuthenticated } = require("./middleware/isAuthenticated");

const { register, login } = require("./controllers/auth");

const {
  viewAllPosts,
  viewCurrentPosts,
  addNewPost,
  editPost,
  deletePost,
} = require("./controllers/posts");

const app = express();
app.use(express.json());
app.use(cors());


User.hasMany(Post);
Post.belongsTo(User);

app.post("/register", register);
app.post("/login", login);

app.get("/posts", viewAllPosts);

app.get("/userposts/:userId", viewCurrentPosts);

app.post("/posts", addNewPost, isAuthenticated);
app.put("/posts/:id", editPost, isAuthenticated);
app.delete("/posts/:id", deletePost, isAuthenticated);



sequelize.sync({ force: true }) //drops tables if any exists
// sequelize
//   .sync()
  .then(() => {
    app.listen(SERVER_PORT, () => {
      console.log(`Server running on port ${SERVER_PORT}`);
    });
  })
  .catch((err) => console.log(err));
