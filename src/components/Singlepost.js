import React, { useContext, useEffect, useState, useCallback } from "react";

import AuthContext from "../store/authContext";

import axios from "axios";

import Comment from "./Comment";

//Material UI
////////////////////////////////////////////////////////
// import * as React from 'react';
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
// import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { teal } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: "#26a69a",
    },
  },
});

///////////////////////////////////////////////////////////

const baseURL = "http://localhost:4000";

const SinglePost = (props) => {
  const { commentId, post, postId, getMyPosts } = props;

  const { userId, token } = useContext(AuthContext);

  const [comments, setComments] = useState([]);

  const getComments = useCallback(() => {
    axios
      .get(`${baseURL}/comments/${post.postId}`)
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

  const deleteComment = (commentId) => {
    axios
      .delete(`${baseURL}/comments/${commentId}`, 
      // {
      //   headers: { authorization: token },
      // }
      )
      .then(() => {
        getComments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateMyPost = (postId, status) => {
    axios
      .put(
        `${baseURL}/posts/${postId}`,
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

  const deleteMyPost = (postId) => {
    axios
      .delete(`${baseURL}/posts/${postId}`, {
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
      <ThemeProvider theme={theme}>
        <div className="post-content">
          <h4 className="username">{post.user.username}</h4>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {userId === post.userId && (
            <div className="edit-post-buttons">
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  className="edit-post-button"
                  onClick={() => {
                    updateMyPost(post.postId, post.privateStatus);
                  }}
                >
                  {post.privateStatus
                    ? "Make Post Public"
                    : "Make Post Private "}
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  className="edit-post-button"
                  onClick={() => {
                    deleteMyPost(post.postId);
                  }}
                >
                  Delete Post
                </Button>
              </Stack>
            </div>
          )}
        </div>
        {/* __________________________________________________ */}
        <section className="comment-section">
          <Comment postId={post.postId} />
          {comments.map((comment) => {
            return (
              <main key={comment.commentId} className="comment-card">
                <h4 className="username">{comment.user.username}</h4>
                <p className="comment">{comment.content}</p>
                {userId === comment.userId && (
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    type="submit"
                    className="delete-comment"
                    onClick={() => {
                      deleteComment(comment.commentId);
                    }}
                  >
                    Delete Comment
                  </Button>
                )}
              </main>
            );
          })}
        </section>
      </ThemeProvider>
    </div>
  );
};

export default SinglePost;
