import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "../firebase-config";
import { signOut, User } from "firebase/auth";
import { uid } from "uid";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, CssBaseline, Stack, Typography, useMediaQuery } from "@mui/material";
import QuickTask from "../components/QuickMenu";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from '@mui/material/styles';
import AddTodo from "../components/AddTodo";
import ChatComp from "../components/ChatComp";
import { collection, DocumentData, getDocs, onSnapshot, query, where, doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux'
import { currentUser } from "../features/apiSlice";
import { DoableUser } from "../types";
import Taskmanager from "../components/Taskmanager";
// import { onValue, ref, set } from "firebase/database"; // Realtime Database

import Link from '@mui/material/Link';
import Navigator from '../components/Navigator';
import NavBar from '../components/NavBar';

import { RootState } from "../store";

const drawerWidth = 256;

type Task = {
  taskId: string;
  title: string;
  desc: string;
  location: string;
};

// Theme för att kunna använda material-ui komponenter

let theme = createTheme({
  palette: {
    primary: {
      light: '#FFC61A', 
      main: '#FFC61A',
      dark: '#FFC61A',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1C1D22',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#FFC61A',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};




const Dashboard = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<DocumentData[]>()
  const [showTasks, setShowTasks] = useState<Task[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.api.doUser)
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const showTaskmanager = useSelector((state: RootState) => state.api.showTaskmanager);
  const showChat = useSelector((state: RootState) => state.api.showChat);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

	useEffect(() => {
        const signedInUser = auth.currentUser;
        if ( signedInUser ) {
          getDoc(doc(db, 'users', signedInUser.email as string)).then((saveUser) => {
            dispatch(currentUser(saveUser.data() as DoableUser));
          })
        } else {
          navigate('/')

        }
	}, [])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', maxHeight: 'calc(100vh - 6rem)' }} maxWidth={'100%'}>
        <CssBaseline />
        <Box 
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              />
              )}
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
        </Box>
        <Box sx={{  display: 'flex', flexDirection: 'column', width: '100%', height: '100%', bgcolor: '#141416'  }}>
          <NavBar onDrawerToggle={handleDrawerToggle} />
          {/* <Box  sx={{  bgcolor: '#141416'}} > */}
          { showTaskmanager ? 
        <Taskmanager /> : ''
      }
      { showChat ? <ChatComp  /> : '' }
          {/* </Box> */}
        </Box>
      </Box>
    </ThemeProvider>

  );
};

export default Dashboard;