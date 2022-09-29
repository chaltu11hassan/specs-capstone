import React, { createContext, useCallback, useState } from "react";

let timeOut;

const AuthContext = createContext({
  token: "",
  login: () => {},
  logout: () => {},
  userId: null,
});

//helper function to culculate time to logout user automatically when inactive
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const expTime = expirationTime;
  const remainingTime = expTime - currentTime;
  return remainingTime;
};

//helper function to look into local storage and remove token if invalid
const getLocalData = () => {
  const storedToken = localStorage.getItem("token");
  const storedExp = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExp);

  if (remainingTime <= 1000 * 30) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationtime");
    return null;
  }
  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const localData = getLocalData();

  let initialToken;
  let initialId;

  if (localData) {
    initialToken = localData.token;
    initialId = localData.userId;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialId);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userId");

    if (timeOut) {
      clearTimeout(timeOut);
    }
  }, []);

  const login = (token, expirationTime, userId) => {
    setToken(token);
    setUserId(userId);

    console.log('userIDDDD', userId);

    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("userId", userId);

    const remainingTime = calculateRemainingTime(expirationTime);

    timeOut = setTimeout(logout, remainingTime);
  };

  const contextValue = {
    token,
    login,
    logout,
    userId,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
