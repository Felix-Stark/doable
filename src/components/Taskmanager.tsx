import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../firebase-config";
import { collection, DocumentData, getDocs, onSnapshot, query, where, doc, getDoc } from "firebase/firestore";

import Grid from "@mui/material/Unstable_Grid2";
import { Box, Button, Select, MenuItem, Stack, Typography, FormControl, SelectChangeEvent, InputLabel, Modal, TextField, ListItemButton, Icon, IconButton } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { uid } from 'uid'

import { ThemeProvider } from "@emotion/react";
import * as theme from "../Themes";
import AddTodo from "./AddTodo";

import { currentUser, selectedList, todos } from "../features/apiSlice";
import { DoableUser, Todo, TodoList } from "../types";


import { RootState } from "../store";
import ShowList from "./ShowList";
import AddList from "./AddList";

const Taskmanager = () => {
	const user = useSelector((state: RootState) => state.api.doUser);
	const isUser = auth.currentUser;
	const dispatch = useDispatch();
	const [openListForm, setOpenListForm] = useState(false);
	const [chosenList, setChosenList] = useState('')
	const [todoLists, setTodoLists] = useState<TodoList[]>([]);

	useEffect(() => {
    if( auth.currentUser ) {
      const listQuery = query(collection(db, 'todolists'), where('participants', 'array-contains', user?.email as string))
			onSnapshot(listQuery, (snapshot) => {
        setTodoLists(snapshot.docs.map(doc => doc.data()) as unknown as TodoList[])
      })
		}
		
	}, [])
  
	
  const handleSelectList = (e: SelectChangeEvent) => {
    setChosenList(e.target.value as string)
      dispatch(selectedList(e.target.value))
    setOpenListForm(false)
  };


  return (
    <Grid
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={"100%"}
      minWidth={"100%"}
      margin={"0 auto"}
    >
      <Box minWidth={"8rem"} display={'flex'}  >
        <FormControl sx={{ m: 1, minWidth: "8rem" }}>
          <InputLabel id="select-list">Select List</InputLabel>
          <Select
            labelId="select-list"
            value={chosenList}
            label="Select list"
            color="primary"
            onChange={handleSelectList}
          >
			<MenuItem value={ 'Pick a list'}>None</MenuItem>
            {todoLists
              ? todoLists.map((list) => {
                  return (
                    <MenuItem value={list.title} key={uid()}>
                      {" "}
                      {list.title}{" "}
                    </MenuItem>
                  );
                })
              : ""}
          </Select>
        </FormControl>
		<IconButton onClick={ () => {
			setOpenListForm(true);
			setChosenList(''); } }>
			<AddCircleRoundedIcon /> {/** Add List */}
		</IconButton>
      </Box>
      {chosenList ? <ShowList /> : ""}
      {openListForm ? <AddList closeListForm={ setOpenListForm } setChosenList={ setChosenList } /> : ""}
    </Grid>
  );
}

export default Taskmanager