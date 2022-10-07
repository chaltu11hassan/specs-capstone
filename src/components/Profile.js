import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

import Comment from "./Comment";

import SinglePost from "./Singlepost";

const baseURL = "http://localhost:4000";

const Profile = (props) => {
  const { postId } = props;

  const { userId } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const getMyPosts = useCallback(() => {
    console.log("profile", userId);

    axios
      .get(`${baseURL}/posts/${userId}`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
        console.log(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

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

  useEffect(() => {
    getMyPosts();
  }, [userId]);

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

  return postsMapped.length >= 1 ? (
    <main className="post-card-main-profile">{postsMapped}</main>
  ) : (
    <main className="post-card-main-profile">
      <h2>No posts to view on Profile, add a post!</h2>
    </main>
  );

};

export default Profile;
