import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../firebase-config";
import { collection, DocumentData, getDocs, onSnapshot, query, where, doc, getDoc } from "firebase/firestore";
import { useCollectionData, useCollectionDataOnce } from "react-firebase-hooks/firestore";

import Grid from "@mui/material/Unstable_Grid2";
import { Box, Button, Select, MenuItem, Stack, Typography, FormControl, SelectChangeEvent, InputLabel, Modal, TextField, ListItemButton, Icon, IconButton } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { uid } from 'uid'

import { currentUser, selectedList, todos } from "../features/apiSlice";
import { RootState } from "../store";
import { DoableUser, Todo, TodoList } from "../types";
import ShowList from "./ShowList";
import AddList from "./AddList";

const Taskmanager = () => {
	const user = useSelector((state: RootState) => state.api.doUser);
  const currentList = useSelector((state: RootState) => state.api.currentList);
	const isUser = auth.currentUser;
	const dispatch = useDispatch();
	const [openListForm, setOpenListForm] = useState(false);
	const [chosenList, setChosenList] = useState('')
	

  const todoListQuery = query(collection(db, "todolists"), where('participants', 'array-contains', user.email));

  const [docs, loading, error, snapshot] = useCollectionData(todoListQuery);
  
    

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
      { loading && "loading..."}
      <Box minWidth={"8rem"} display={'flex'}  >
        <FormControl sx={{ m: 1, minWidth: "8rem" }}>
          <InputLabel id="select-list">Select List</InputLabel>
          <Select
            labelId="select-list"
            value={currentList}
            label="Select list"
            color="primary"
            onChange={handleSelectList}
          >
			<MenuItem value={ 'None'}>None</MenuItem>
            { user ? docs?.map((doc) => {
                  return (
                    <MenuItem value={doc.title} key={uid()}>
                      {" "}
                      {doc.title}{" "}
                    </MenuItem>
                  );
                })
              : ''}
          </Select>
        </FormControl>
		<IconButton onClick={ () => {
			setOpenListForm(true);
			dispatch(selectedList('')); } }>
			<AddCircleRoundedIcon /> {/** Add List */}
		</IconButton>
      </Box>
      {currentList ? <ShowList /> : ""}
      {openListForm ? <AddList closeListForm={ setOpenListForm } setChosenList={ setChosenList } /> : ""}
    </Grid>
  );
}

export default Taskmanager