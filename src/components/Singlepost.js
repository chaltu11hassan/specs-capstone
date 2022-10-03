import React, { useContext, useEffect, useState, useCallback } from "react";

import AuthContext from "../store/authContext";

import axios from "axios";

import Comment from "./Comment";

const baseURL = "http://localhost:4000";

const SinglePost = (props) => {
  const { post, postId, getMyPosts } = props;
  const { userId, token } = useContext(AuthContext);

  const [comments, setComments] = useState([]);

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
    getComments();
  }, [getComments]);


//   const deleteMyComment = (commentId) => {
//     axios
//       .delete(`${baseURL}/comments/${commentId}`)
//       .then(() => {
//         getComments();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

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
      .delete(`${baseURL}/posts/${id}`, {
        headers: { authorization: token },
      })
      .then(() => {
        getMyPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };


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
      <Comment postId={post.postId} />
    </div>
  );
};

export default SinglePost;
