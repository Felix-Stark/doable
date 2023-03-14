import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../firebase-config";
import { collection, DocumentData, getDocs, onSnapshot, query, where, doc, getDoc } from "firebase/firestore";

import Grid from "@mui/material/Unstable_Grid2";
import { Box, Button, Select, MenuItem, Stack, Typography, FormControl, SelectChangeEvent, InputLabel, Modal, TextField, ListItemButton } from "@mui/material";
import { uid } from 'uid'

import { ThemeProvider } from "@emotion/react";
import * as theme from "../Themes";
import AddTodo from "./AddTodo";

import { currentUser, selectedList } from "../features/apiSlice";
import { DoableUser, TodoList } from "../types";


import { RootState } from "../store";
const Taskmanager = () => {
	const user = useSelector((state: RootState) => state.api.doUser);
	const isUser = auth.currentUser;
	const dispatch = useDispatch();
	const [openTodoForm, setOpenTodoForm] = useState(false);
	const [openListForm, setOpenListForm] = useState(false);
	const [chosenList, setChosenList] = useState('')
	const [todoLists, setTodoLists] = useState<TodoList[]>([]);

	useEffect(() => {
		if( isUser ) {
			const listQuery = query(collection(db, 'todolists'), where('created_by', '==', isUser?.email as string))
			onSnapshot(listQuery, (snapshot) => {
			setTodoLists(snapshot.docs.map(doc => doc.data()) as unknown as TodoList[])
		})
		}
		
	})

	// const getLists = async () => {
	// 	if( isUser ) {

	// 		const listQuery = query(collection(db, 'todolists'), where('created_by', '==', isUser.email as string))
	// 		const listSnapshot = await getDocs(listQuery)
	// 		setTodoLists(listSnapshot.docs.map((doc) => doc.data()))
	// 	}
	// }

	

	const handleSelectList = (e: SelectChangeEvent) => {
    	setChosenList(e.target.value as string);
		console.log('vald lista: ', chosenList)
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
      <Box minWidth={"8rem"}>
        <FormControl sx={{ m: 1, minWidth: '8rem' }} style={{ color: '#000'}}>
			<InputLabel id='select-list' >Select List</InputLabel>
			<Select
				labelId="select-list"
				value={chosenList}
				label="Select list"
				onChange={ handleSelectList}
			>
          {todoLists
            ? todoLists.map((list) => {
              return (
                <MenuItem value={ list.title } key={ uid() }> { list.title } </MenuItem>
                );
              })
              : ""}
          </Select>
        </FormControl>
      </Box>
    </Grid>
  );
}

export default Taskmanager