import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/authContext";

const Header = () => {
  const authCtx = useContext(AuthContext);

  const styleActiveLink = ({ isActive }) => {
    return {
      color: isActive ? "yellow" : "",
    };
  };

  return (
    <header className="App-header">
      <div className="app-name">
        <h2>Miaa'waa</h2>
      </div>
      <nav>
        {authCtx.token ? (
          <ul className="main-nav">
            <li>
              <NavLink style={styleActiveLink} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink style={styleActiveLink} to="profile">
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink style={styleActiveLink} to="form">
                Posts
              </NavLink>
            </li>
            <li>
              <button
                className="logout-btn"
                onClick={() => {
                  authCtx.logout();
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className="main-nav">
            <li>
              <NavLink style={styleActiveLink} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink style={styleActiveLink} to="/auth">
                Login or Register
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
