import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

const baseURL = "http://localhost:4000";

const Profile = () => {
  const { userId, token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const getMyPosts = useCallback(() => {
    console.log("profile", userId);

    axios
      .get(`${baseURL}/userposts/${userId}`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
        // console.log(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  useEffect(() => {
    getMyPosts();
  }, [userId]);

  const updateMyPost = (id, status) => {
    axios
      .put(
        `${baseURL}/posts/${id}`,
        { status: !status },
        { headers: { authorization: token } }
      )
      .then(() => {
        getMyPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteMyPost = (id) => {
    axios
      .delete(`${baseURL}/posts/${id}`, { headers: { authorization: token } })
      .then(() => {
        getMyPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postsMapped = posts.map((post) => {
    return (
      <div className="card-for-post" key={post.postId}>
        <h4>{post.user.username}</h4>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        {userId === post.userId && (
          <div className="edit-post-buttons">
            <button
              className="edit-post-button"
              onClick={() => {
                updateMyPost(post.postId, post.privateStatus);
              }}
            >
              {post.privateStatus ? "Make Public Post" : "Make Private Post"}
            </button>
            <button
              className="edit-post-button"
              style={{ marginLeft: 10 }}
              onClick={() => {
                deleteMyPost(post.postId);
              }}
            >
              Delete Post
            </button>
          </div>
        )}
      </div>
    );
  });

  return postsMapped.length >= 1 ? (
    <main className="post-card-main">{postsMapped}</main>
  ) : (
    <main className="no-posts-main">
      <h2>Add a post, you dont have any yet!</h2>
    </main>
  );
};

export default Profile;
