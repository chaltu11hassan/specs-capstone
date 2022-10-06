import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/authContext";

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//Material UI
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// import * as React from 'react';
import Button from "@mui/material/Button";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
// import Divider from "@mui/material/Divider";
// import { styled } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import { pink } from "@mui/material/colors";
import SvgIcon from "@mui/material/SvgIcon";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
// import IconButton from '@mui/material/IconButton';
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[50],
    },
    secondary: {
      main: "#fafafa",
    },
  },
});

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function SvgIconsColor() {
  return (
    <Box
      sx={{
        "& > :not(style)": {
          m: 2,
        },
      }}
    >
      <HomeIcon />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon sx={{ color: pink[500] }} />
    </Box>
  );
}
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

const Header = () => {
  const authCtx = useContext(AuthContext);

  const styleActiveLink = ({ isActive }) => {
    return {
      color: isActive ? "black" : "black",
    };
  };

  //onClick={() => {<NavLink style={styleActiveLink} to="/" />}}

  return (
    <header className="App-header">
      <ThemeProvider theme={theme}>
        <Button variant="solid" className="app-name">
          <h1 className="applicationName">
            <a id="fakelogo" href="/home">
              Miaa'waa
            </a>
          </h1>
        </Button>
        <nav>
          {authCtx.token ? (
            <ul className="main-nav">
              <Stack direction="row" spacing={2}>
                <li>
                  <NavLink style={styleActiveLink} to="/">
                    <Button
                      variant="outlined"
                      startIcon={<HomeIcon sx={{ width: 25, height: 25 }} />}
                    >
                      Home
                    </Button>
                  </NavLink>
                </li>
                <li>
                  <NavLink style={styleActiveLink} to="profile">
                    <Button
                      variant="outlined"
                      startIcon={<PersonIcon sx={{ width: 25, height: 25 }} />}
                    >
                      Profile
                    </Button>
                  </NavLink>
                </li>
                <li>
                  <NavLink style={styleActiveLink} to="posts">
                    <Button
                      variant="outlined"
                      startIcon={
                        <RamenDiningIcon sx={{ width: 25, height: 25 }} />
                      }
                    >
                      Create Recipe
                    </Button>
                  </NavLink>
                </li>
                <li>
                  <Button
                    variant="outlined"
                    startIcon={<LogoutIcon />}
                    className="logout-btn"
                    onClick={() => {
                      authCtx.logout();
                    }}
                  >
                    Logout
                  </Button>
                </li>
              </Stack>
            </ul>
          ) : (
            <ul className="main-nav">
              <li>
                <NavLink style={styleActiveLink} to="/">
                  <Button
                    variant="outlined"
                    startIcon={<HomeIcon sx={{ width: 25, height: 25 }} />}
                  >
                    Home
                  </Button>
                </NavLink>
              </li>
              <li>
                <NavLink style={styleActiveLink} to="/auth">
                  <Button variant="outlined" startIcon={<LoginIcon />}>
                    Login || Register
                  </Button>
                </NavLink>
              </li>
            </ul>
          )}
        </nav>
      </ThemeProvider>
    </header>
  );
};

export default Header;
