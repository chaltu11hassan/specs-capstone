import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

const Home = () => {
  const { userId } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/posts")
      .then((res) => {
        if (userId) {
          const otherPosts = res.data.filter((post) => userId !== post.userId);
          setPosts(otherPosts);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const postsMapped = posts.map((post) => {
    return (
      <div className="card-for-post" key={post.id}>
        <h4>{post.user.username}</h4>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </div>
    );
  });

  return postsMapped.length >= 1 ? (
    <main>{postsMapped}</main>
  ) : (
    <main>
      <h2>NO POSTS YET</h2>
    </main>
  );
};

export default Home;
