import React, { useContext, useState } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      .then(() => {
        navigate("/comments");
      })
      .catch((error) => console.log(error));
  };

  return (
    <main className="comment-main">
      <form className="comment-form" onSubmit={commentSubmitHandler}>
        <textarea
          className="comment-input"
          type="text"
          placeholder="Add Comment"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
        <button className="comment-button">Submit Comment</button>
      </form>
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
