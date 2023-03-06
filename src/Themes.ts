import { ThemeOptions, createTheme } from "@mui/material/styles";

export const darkTheme: ThemeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7e34e6",
    },
    secondary: {
      main: "#9c27b0",
    },
    success: {
      main: "#00ffe1",
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



export const lightTheme: ThemeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7e34e6",
    },
    secondary: {
      main: "#9c27b0",
    },
    success: {
      main: "#00ffe1",
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