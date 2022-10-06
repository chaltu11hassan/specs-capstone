import React, { useContext, useState } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Comment from "./Comment";

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//*Material UI
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// import * as React from 'react';
import Button from "@mui/material/Button";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SendIcon from "@mui/icons-material/Send";
// import Stack from "@mui/material/Stack";
// import Divider from "@mui/material/Divider";
// import { styled } from "@mui/material/styles";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[100],
    },
    secondary: {
      main: "#f5f5f5",
    },
  },
});
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

const baseURL = "http://localhost:4000";

const Posts = () => {
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Posts", userId);

    axios
      .post(
        `${baseURL}/posts`,
        { title, content, status, userId },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        navigate("/profile");
      })
      .catch((error) => console.log(error));
  };

  return (
    <main className="posts-main">
      <ThemeProvider theme={theme}>
        <h2 id="welcome-post">Start Your Delicious Journey Here</h2>
        <form className="post-form" onSubmit={handleSubmit}>
          Create New Recipe
          <input
            className="post-input"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <br></br>
          <textarea
            className="post-textarea"
            type="text"
            placeholder="Description"
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
          />
          <div className="status-container">
            <div className="status-buttons">
              <input
                type="radio"
                name="status"
                id="private-status"
                value={true}
                onChange={(event) => {
                  setStatus(event.target.value);
                }}
                checked={true}
              />
              <label htmlFor="private-status">Private</label>
            </div>

            <div className="status-buttons">
              <input
                type="radio"
                name="status"
                id="public-status"
                value={false}
                onChange={(event) => {
                  setStatus(event.target.value);
                }}
              />
              <label htmlFor="public-status">Public</label>
            </div>
          </div>
          <br></br>
          <Button variant="outlined" type="submit" className="post-button">
            Submit
          </Button>
        </form>
      </ThemeProvider>
    </main>
  );
};

export default Posts;
