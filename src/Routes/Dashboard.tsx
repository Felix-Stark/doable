import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "../firebase-config";
import { signOut } from "firebase/auth";
import { uid } from "uid";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Stack, Typography } from "@mui/material";
import QuickTask from "../components/QuickMenu";
import { ThemeProvider } from "@emotion/react";
import * as theme from "../Themes";
import AddTodo from "../components/AddTodo";

// import { onValue, ref, set } from "firebase/database"; // Realtime Database


type Task = {
  taskId: string;
  title: string;
  desc: string;
  location: string;
};

const Dashboard = () => {
  const [todo, setTodo] = useState("");
  const [showTasks, setShowTasks] = useState<Task[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
      
      
    });
  });

  return (
<ThemeProvider theme={ theme.darkTheme }>
      <Grid
        display={"flex"}
        flexDirection={'column'}
        justifyContent={"center"}
        alignItems={'center'}
        minHeight={"100vh"}
        margin={"0 auto"}
        minWidth={"100vw"}
        sx={{background: theme.darkTheme.palette?.background?.default}}
      >
        <Box
          width={"80%"}
          minHeight={"100%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          position={"relative"}

        >
          <AddTodo />
          <Box position={'absolute'} bottom={5} right={5} >
            <QuickTask />
          </Box>
        </Box>
      </Grid>
</ThemeProvider>
  );
};

export default Dashboard;
