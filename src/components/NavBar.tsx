import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router";

// For Header MUI
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useDispatch, useSelector } from "react-redux";
import { toggleChat, toggleTaskmanager, switchView } from "../features/apiSlice";



interface NavBarProps {
  onDrawerToggle: () => void;
}


export default function MenuBar(props: NavBarProps) {
  const { onDrawerToggle } = props;
  

  // const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
  //   null
  // );
  // const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
  //   null
  // );
  // const [photoURL, setPhotoURL] = React.useState("");

  // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };


  // const handleSignOut = () => {
  //   signOut(auth).catch((err) => {
  //     alert(err.message);
  //   });
  //   navigate("/");
  // };
  

  const dispatch = useDispatch(); 

  
  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}  sx={{backgroundColor: '#1C1D22'}}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          <Grid item xs />
          <Grid item >
            <Typography color="inherit" variant="h5" component="h1">
                Doable
            </Typography>
            </Grid>
            <Grid item xs />
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0,  backgroundColor: '#1C1D22'  }}>
        <Tabs value={0} textColor="inherit">
          <Tab label="Todos" onClick={() => dispatch(switchView(true))} />
          <Tab label="Chat" onClick={() => dispatch(switchView(false)) } />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}



