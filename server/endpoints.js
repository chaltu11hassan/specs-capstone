
app.post("/register", register);
app.post("/login", login);

app.get("/posts", viewAllPosts);
app.get("/userposts/:userId", viewCurrentPosts);
app.post("/posts", isAuthenticated, addNewPost);
app.put("/posts/:id", isAuthenticated, editPost);
app.delete("/posts/:id", isAuthenticated, deletePost);