import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "../firebase-config";
import { signOut } from "firebase/auth";
import { uid } from "uid";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, CssBaseline, Stack, Typography, useMediaQuery } from "@mui/material";
import QuickTask from "../components/QuickMenu";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from '@mui/material/styles';
import AddTodo from "../components/AddTodo";
import ChatComp from "../components/ChatComp";
import { collection, DocumentData, getDocs, onSnapshot, query, where, doc, getDoc } from "firebase/firestore";
import { useDispatch } from 'react-redux'
import { currentUser } from "../features/apiSlice";
import { DoableUser } from "../types";
import Taskmanager from "../components/Taskmanager";
// import { onValue, ref, set } from "firebase/database"; // Realtime Database

import Link from '@mui/material/Link';
import Navigator from '../components/Navigator';
import NavBar from '../components/NavBar';
import { Copyright } from "@mui/icons-material";
import Content from "../components/Content";

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
      light: '#63ccff', 
      main: '#009be5',
      dark: '#006db3',
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

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

	useEffect(() => {
		auth.onAuthStateChanged( async (user) => {
			if ( user ) {
				const getUser = await getDoc(doc(db, 'users', user.email as string))
				if( getUser ) {
					dispatch(currentUser(getUser.data() as DoableUser));
				} else {
					navigate('/user-settings')
				}
				console.log('getUser: ', getUser.data())
				
			} else {
				navigate('/')
			}
		})
	})

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
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
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <NavBar onDrawerToggle={handleDrawerToggle} />
          <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#141416' }}>
            <Content />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>

  );
};

export default Dashboard;