require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { DataTypes } = require("sequelize");
const { SERVER_PORT } = process.env;
const { sequelize } = require("./controllers/seed");
const { users } = require("./models/user");
const { posts } = require("./models/post");
const { comments } = require("./models/comments");

sequelize.define("posts", {
  postId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  privateStatus: DataTypes.BOOLEAN,
});

const { isAuthenticated } = require("./middleware/isAuthenticated");
const { register, login } = require("./controllers/auth");
const {
  viewAllPosts,
  viewCurrentPosts,
  addNewPost,
  editPost,
  deletePost,
} = require("./controllers/posts");
const user = require("./models/user");
const post = require("./models/post");

const app = express();
app.use(express.json());
app.use(cors());

/////////////////////////////////////////
users.hasMany(posts, { foreignKey: "userId", onDelete: "CASCADE" });
users.hasMany(comments, { foreignKey: "userId", onDelete: "CASCADE" });
posts.hasMany(comments, { foreignKey: "postId", onDelete: "CASCADE" });
posts.belongsTo(users, { foreignKey: "userId", onDelete: "CASCADE" });
comments.belongsTo(posts, { foreignKey: "postId", onDelete: "CASCADE" });
comments.belongsTo(users, { foreignKey: "userId", onDelete: "CASCADE" });

// users.hasMany(posts);
// posts.belongsTo(users, { foreignKey: "userId" });
// users.hasMany(comments);
// posts.hasMany(comments);
// comments.belongsTo(posts, { foreignKey: "postId" });
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
