import "./App.css";
import React, { useContext } from "react";
import AuthContext from "./store/authContext";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Posts from "./components/Posts";
import Profile from "./components/Profile";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={authCtx.token ? <Home /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!authCtx.token ? <Auth /> : <Navigate to="/" />}
        />
        <Route
          path="/posts"
          element={authCtx.token ? <Posts /> : <Navigate to="/auth" />}
        />
        <Route
          path="/profile"
          element={authCtx.token ? <Profile /> : <Navigate to="/auth" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
