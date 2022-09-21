import React, { useContext, useState } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";

const baseURL = "http://localhost:4000";

const Auth = () => {
  const authCtx = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("submitHandler used");

    const body = {
      username,
      password,
    };

    axios
      .post(register ? `${baseURL}/register` : `${baseURL}/login`, body)
      .then((res) => {
        console.log("after authorization", res.data);
        authCtx.login(res.data.token, res.data.expirationTime, res.data.userId);
      })
      .catch((err) => {
        setUsername("");
        setPassword("");
      });
  };

  return (
    <main>
      <h2>Welcome to Miaa'waa: a delicious journey</h2>
      <form className="auth-form" onSubmit={submitHandler}>
        <input
          className="auth-input"
          type="text"
          placeholder="enter username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          className="auth-input"
          type="text"
          placeholder="enter password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button className="auth-btn">{register ? "Register" : "Login"}</button>
      </form>
      <button
        className="auth-btn"
        onClick={() => {
          setRegister(!register);
        }}
      >
        Need to {register ? "Login" : "Register"}?
      </button>
    </main>
  );
};

export default Auth;
