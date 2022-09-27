require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { SERVER_PORT } = process.env;
const { sequelize } = require("./controllers/seed");
const { users } = require("./models/user");
const { posts } = require("./models/post");
const { comments } = require("./models/comments");

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

/////////////////////////////////////////
users.hasMany(posts);
posts.belongsTo(users);
comments.belongsTo(posts);
users.hasMany(comments);

/////////////////////////////////////////

app.post("/register", register);
app.post("/login", login);

app.get("/posts", viewAllPosts);
app.get("/userposts/:userId", viewCurrentPosts);
app.post("/posts", isAuthenticated, addNewPost);
app.put("/posts/:id", isAuthenticated, editPost);
app.delete("/posts/:id", isAuthenticated, deletePost);

sequelize
  .sync({ force: true }) //drops tables if any exists
// sequelize
//   .sync()
  .then(() => {
    app.listen(SERVER_PORT, () => {
      console.log(`Server running on port ${SERVER_PORT}`);
    });
  })
  .catch((err) => console.log(err));
