import React, { useContext, useState } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";

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
import { teal, blueGrey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      // main: teal[500],
      main: "#0000",
    },
    secondary: {
      main: "#fff",
    },
  },
});
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

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
      .post(register ? `${baseURL}/login ` : `${baseURL}/register`, body)
      .then((res) => {
        console.log("after authorization", res.data);
        authCtx.login(res.data.token, res.data.expirationTime, res.data.userId);
        // window.location.reload();
      })
      .catch((err) => {
        setUsername("");
        setPassword("");
      });
  };

  return (
   
      <main className="auth-main">
        <h2 className="welcome">Welcome to Miaa'waa: a delicious journey</h2>
        <ThemeProvider theme={theme}>
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
            <br></br>

            <input
              className="auth-input"
              type="password"
              placeholder="enter password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <br></br>

            <Button
              variant="outlined"
              color="secondary"
              type="submit"
              className="auth-btn1"
            >
              {register ? "Login" : "Register"}
            </Button>
          </form>
          <br></br>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            className="auth-btn"
            onClick={() => {
              setRegister(!register);
            }}
          >
            Click here to {register ? "Register" : "Login"}
          </Button>
        </ThemeProvider>
      </main>
    
  );
};

export default Auth;
