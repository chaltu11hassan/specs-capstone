import React, { useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

// import Comment from "./Comment";

import SinglePost from "./Singlepost";

const baseURL = "http://localhost:4000";

const Home = (props) => {
  const { postId, commentId } = props;

  const { userId } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // console.log(userId);
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
  },[userId]);

  const getComments = useCallback(() => {
    axios
      .get(`${baseURL}/comments/${postId}`)
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
        console.log(comments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);
  //////////////////////////////////////

  useEffect(() => {
    // console.log(userId);
    axios
      .get(`${baseURL}/comments/${postId}`)
      .then((res) => {
        setComments(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);

  const postsMapped = posts.map((post) => {
    return (
      <SinglePost
      key={post.postId}
        post={post}
        getMyPosts={getMyPosts}
        getComments={getComments}
        postId={post.postId}
      />
    );
  });

  // const postsMapped = posts.map((post) => {
  //   return (
  //     <div className="card-for-post" key={post.postId}>
  //       <h4>{post.user.username}</h4>
  //       <h3>{post.title}</h3>
  //       <p>{post.content}</p>
  //       <Comment postId={post.postId} />
  //     </div>
  //   );
  // });

  return postsMapped.length >= 1 ? (
    <main className="post-card-main">{postsMapped}</main>
  ) : (
    <main className="no-posts">
      <h2>No posts to view on Home, add a post!</h2>
    </main>
  );
};

export default Home;
