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
    <main className="posts">
      <h1>NO POSTS</h1>
    </main>
  );
};

export default Posts;
