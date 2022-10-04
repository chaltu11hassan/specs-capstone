import React, { useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

// import Comment from "./Comment";

import SinglePost from "./Singlepost";

const baseURL = "http://localhost:4000";

const Home = (props) => {
  const { postId} = props;

  const { userId } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    console.log("home", userId);
    axios
      .get(`${baseURL}/posts`)
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  ///////////////////////////////////////
  const getMyPosts = useCallback(() => {
    // console.log("profile", userId);

    axios
      .get(`${baseURL}/posts`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
        // console.log(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);
  //////////////////////////////////////

  const postsMapped = posts.map((post) => {
    return (
      <SinglePost
        key={post.postId}
        post={post}
        getMyPosts={getMyPosts}
        postId={post.postId}
      />
    );
  });


  return postsMapped.length >= 1 ? (
    <main className="post-card-main">{postsMapped}</main>
  ) : (
    <main className="no-posts">
      <h2>No posts to view on Home, add a post!</h2>
    </main>
  );
};

export default Home;
