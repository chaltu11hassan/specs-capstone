import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

const Profile = () => {
  const { userId, token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const getMyPosts = useCallback(() => {
    axios
      .get(`/userposts/${userId}`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  useEffect(() => {
    getMyPosts();
  }, [getMyPosts]);

  const updateMyPost = (id, status) => {
    axios
      .put(
        `/posts/${id}`,
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
      .delete(`/posts/${id}`, { headers: { authorization: token } })
      .then(() => {
        getMyPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postsMapped = posts.map((post) => {
    return (
      <div className="card-for-post" key={post.id}>
        <h4>{post.user.username}</h4>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        {userId === post.userI && (
          <div>
            <button
              className="edit-post-button"
              onClick={() => {
                updateMyPost(post.id, post.privatStatus);
              }}
            >
              {post.privatStatus ? "Make Public Post" : "Make Private Post"}
            </button>
            <button
              className="edit-post-button"
              style={{ marginLeft: 10 }}
              onClick={() => {
                deleteMyPost(post.id);
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
    <main>{postsMapped}</main>
  ) : (
    <main>
      <h2>Add a post, you dont have any yet!</h2>
    </main>
  );
};

export default Profile;
