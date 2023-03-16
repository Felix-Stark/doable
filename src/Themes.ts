import { ThemeOptions, createTheme } from "@mui/material/styles";

export const darkTheme: ThemeOptions = createTheme({

  palette: {
    mode: 'dark',
    primary: {
      main: '#FFC61A',
    },
    secondary: {
      main: '#9c27b0',
    },
    success: {
      main: '#00ffe1',
    },
    background: {
      default: '#37313d',
    },
    info: {
      main: '#b2ebf2',
    },
  },
  typography: {
    h1: {
      fontFamily: 'Raleway',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
  },
  components: {},
});



export const lightTheme: ThemeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFC61A",
    },
    secondary: {
      main: "#FFC61A",
    },
    success: {
      main: "#FFC61A",
    },
    background: {
      default: "#ffffff",
      paper: "#c9c8c0",
    },
  },
  typography: {
    h1: {
      fontFamily: "Raleway",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {},
});



