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
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fea034",
      // main: teal[500],
      // main: "#219a80;",
    },
    secondary: {
      // main: "#fff",
      // main: "#000000",
      main: "#000000",
      // "#00bfa5",
    },
  },
});

///////////////////////////////////////////////////////////

const baseURL = "http://localhost:4000";

const SinglePost = (props) => {
  const { post, postId, getMyPosts } = props;

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

  const deleteMyComment = (commentId) => {
    axios
      .delete(`${baseURL}/comments/${commentId}`, {
        headers: { authorization: token },
      })
      .then(() => {
        getComments();
        // getMyPosts();
      })
      .catch((error) => {
        console.log("this call is not working");
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
        <section className="post-section">
          <div className="post-content">
            <h3 className="username">{post.user.username}</h3>
            <h1>{post.title}</h1>
            <p className="post-p"><span>{post.content}</span></p>
            {userId === post.userId && (
              <div className="edit-post-buttons">
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    className="edit-post-button"
                    startIcon={
                      post.privateStatus ? <LockOpenIcon /> : <LockIcon />
                    }
                    onClick={() => {
                      updateMyPost(post.postId, post.privateStatus);
                    }}
                  >
                    {post.privateStatus
                      ? "Make Recipe Public"
                      : "Make Recipe Private"}
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    className="edit-post-button"
                    onClick={() => {
                      deleteMyPost(post.postId);
                    }}
                  >
                    Delete Recipe
                  </Button>
                </Stack>
              </div>
            )}
          </div>
          {/* __________________________________________________ */}
          <Comment postId={post.postId} />
          {comments.map((comment) => {
            return (
              <main key={comment.commentId} className="comment-card">
                <h4 className="username">{comment.user.username}</h4>
                <p className="comment-p">{comment.content}</p>
                {userId === comment.userId && (
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    type="submit"
                    startIcon={<DeleteIcon />}
                    className="delete-comment"
                    onClick={() => {
                      deleteMyComment(comment.commentId);
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
