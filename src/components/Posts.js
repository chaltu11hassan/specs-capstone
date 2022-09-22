import React, { useContext, useState } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    axios
      .post(
        "/posts",
        { title, content, status, userId },
        { headers: { authorization: token } }
      )
      .then(() => {
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className="posts-main">
      <h1>NO POSTS YET , Add a post below</h1>
      <form className="post-form" onSubmit={submitHandler}>
        <input
          className="post-input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
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
              id="private-status"
              type="radio"
              name="status"
              value={true}
              checked={true}
              onChange={(event) => {
                setStatus(event.target.value);
              }}
            />
            <label htmlFor="private-status">Private</label>
          </div>

          <div className="status-buttons">
            <input
              id="public-status"
              type="radio"
              name="status"
              value={false}
              onChange={(event) => {
                setStatus(event.target.value);
              }}
            />
            <label htmlFor="public-status">Public</label>
          </div>
        </div>
        <button className="post-button">Submit</button>
      </form>
    </main>
  );
};

export default Posts;
