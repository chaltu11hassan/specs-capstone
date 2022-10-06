import React, { useContext, useState } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


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

      // main: "#fff",
      main: '#000000'
    },
  },
});

///////////////////////////////////////////////////////////


const baseURL = "http://localhost:4000";

const Comment = (props) => {
  const { postId } = props;
  const { token, userId } = useContext(AuthContext);

  const navigate = useNavigate();
  console.log(props.postId);

  const [content, setContent] = useState("");

  const commentSubmitHandler = (event) => {
    event.preventDefault();
    // console.log(userId);

    axios
      .post(
        `${baseURL}/comments`,
        { content, postId, userId },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(
        () => {
        navigate('/home');
      }
      )
      .catch((error) => console.log(error));

  };

  return (
    <main className="comment-main">
      <ThemeProvider theme={theme}>
      <form className="comment-form" onSubmit={commentSubmitHandler}>
        <textarea
          className="comment-input"
          type="text"
          placeholder="ADD YOUR COMMENT HERE"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
        <Button 
        variant="contained"
        size="small"
        color="secondary"
        type="submit" className="comment-button">Submit Comment</Button>
      </form>
      </ThemeProvider>
    </main>
  );
};

export default Comment;

//CRUD REST Endpoints:
//Create = POST from '/comments' (INSERT INTO Database)
//Read All = GET from '/comments'
//Read One = GET from '/comments/commentId'
//Update = PUT to '/comments/commentId'
//Delete = DELETE from '/comment/commmentId
