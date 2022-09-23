import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

const baseURL = "http://localhost:4000";

const Home = () => {
  const { userId } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/posts`)
      .then((res) => {
        if (userId) {
          // const otherPosts = res.data.filter((post) => userId !== post.userId);
          //       setPosts(otherPosts)
          //   } else {
          //       setPosts(res.data)
          //   }
          setPosts(res.data);
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
    <main className="post-card-main">{postsMapped}</main>
  ) : (
    <main className="no-posts">
      <h2>Add a post, you dont have any yet!</h2>
    </main>
  );
};

export default Home;
