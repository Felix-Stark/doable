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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function MenuBar(props: NavBarProps) {
  const { onDrawerToggle } = props;
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
 
  

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
        <Tabs value={value} onChange={handleChange} textColor="inherit" indicatorColor="secondary" >
          <Tab value={0} label="Todos" onClick={() => dispatch(switchView(true))} />
          <Tab value={1}  label="Chat" onClick={() => dispatch(switchView(false)) } />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}



