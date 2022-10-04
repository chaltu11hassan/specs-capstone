require("dotenv").config();

const express = require("express");
const cors = require("cors");

// const { DataTypes } = require("sequelize");
const { SERVER_PORT } = process.env;
const { sequelize } = require("./controllers/seed");
const { User } = require("./models/user");
const { Post } = require("./models/post");
const { Comment } = require("./models/comments");

const { isAuthenticated } = require("./middleware/isAuthenticated");
const { register, login } = require("./controllers/auth");
const {
  viewAllPosts,
  viewCurrentPosts,
  addNewPost,
  editPost,
  deletePost,
} = require("./controllers/posts");

const {
  getComments,
  addComment,
  deleteComment,
} = require("./controllers/comments");

// const user = require("./models/user");
// const post = require("./models/post");

const app = express();
app.use(express.json());
app.use(cors());

/////////////////////////////////////////
User.hasMany(Post, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Comment, { foreignKey: "userId", onDelete: "CASCADE" });
Post.hasMany(Comment, { foreignKey: "id", onDelete: "CASCADE" });
Post.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
Comment.belongsTo(Post, { foreignKey: "id", onDelete: "CASCADE" });
Comment.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

// User.hasMany(posts);
// posts.belongsTo(User, { foreignKey: "userId" });
// User.hasMany(comments);
// posts.hasMany(comments);
// comments.belongsTo(posts, { foreignKey: "id" });
/////////////////////////////////////////

app.post("/register", register);
app.post("/login", login);

app.get("/posts", viewAllPosts);
app.get("/posts/:userId", viewCurrentPosts);
app.post("/posts", isAuthenticated, addNewPost);
app.put("/posts/:postId", isAuthenticated, editPost);
app.delete("/posts/:postId", isAuthenticated, deletePost);

app.get("/comments/:postId", getComments);
app.post("/comments", isAuthenticated, addComment);
app.delete("comments/:commentId", isAuthenticated, deleteComment);

// sequelize
//   .sync({ force: true }) //drops tables if any exists
sequelize
  .sync()
  .then(() => {
    //////////////////////////////////////////////////////////////////
    // User.create({
    //   username: "chaltu12hassan",
    //   hashedPass:
    //     "$2a$10$XD8w2CRSi3.9JVrFuOumvOfDXhqdWRQpHh6Jaq7zGtt0.gxsxmOyy",
    // });
    // Post.bulkCreate([
    //   {
    //     title: "my life",
    //     content: "lllllllllllllllllllll",
    //     privateStatus: true,
    //   },
    //   {
    //     title: "my sisters life",
    //     content: "xxxxxxxxxxxxxxxxxxxxxx",
    //     privateStatus: false,
    //   },
    //   {
    //     title: "my brothers life",
    //     content: "yyyyyyyyyyyyyyyyyyyyy",
    //     privateStatus: false,
    //   },
    // ]);
    //////////////////////////////////////////////////////////////////////
    app.listen(SERVER_PORT, () => {
      console.log(`Server running on port ${SERVER_PORT}`);
    });
  })
  .catch((err) => console.log(err));
