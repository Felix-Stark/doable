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

// import { onValue, ref, set } from "firebase/database"; // Realtime Database


type Task = {
  taskId: string;
  title: string;
  desc: string;
  location: string;
};

const Dashboard = () => {
  const [todo, setTodo] = useState("");
  const [showTasks, setShowTasks] = useState<Task[] | EmptyTaskList>([]);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
      
      
    });
  });

  return (
    <ThemeProvider theme={theme.lightTheme}>
      <Grid
        justifyContent={"center"}
        minHeight={"100vh"}
        margin={"0 auto"}
        minWidth={"100vw"}
      >
        <Typography component={"h2"} mt={10} maxHeight={"2em"}>
          Tasks
        </Typography>

        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          
        </Box>
        <Box position={"fixed"} bottom={0} right={2}>
          <QuickTask />
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default Dashboard;
