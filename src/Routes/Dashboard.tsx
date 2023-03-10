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
import ChatComp from "../components/ChatComp";
import { collection, DocumentData, getDocs, onSnapshot, query, where, doc, getDoc } from "firebase/firestore";
import { useDispatch } from 'react-redux'
import { currentUser } from "../features/apiSlice";
import { DoableUser } from "../types";
// import { onValue, ref, set } from "firebase/database"; // Realtime Database


type Task = {
  taskId: string;
  title: string;
  desc: string;
  location: string;
};

const Dashboard = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<DocumentData[]>()
  const [showTasks, setShowTasks] = useState<Task[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

      <Grid
        display={"flex"}
        flexDirection={'column'}
        justifyContent={"center"}
        alignItems={'center'}
        minHeight={"100vh"}
        margin={"0 auto"}
        minWidth={"100vw"}

      >
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Typography component={"h1"} mt={10} maxHeight={"2em"}>
          </Typography>
        </Box>
            <ChatComp />

        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
        <Typography component={"h2"} mt={10} maxHeight={"2em"}>
          Tasks
        </Typography>
        </Box>

        <Box
          width={"80%"}
          minHeight={"80vh"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          position={"relative"}

        >
          <AddTodo />
        </Box>
          <Box position={'absolute'} bottom={5} right={5} >
            <QuickTask />
          </Box>
      </Grid>

  );
};

export default Dashboard;
