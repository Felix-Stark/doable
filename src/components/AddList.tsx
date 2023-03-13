import React from 'react'
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useState, useEffect } from 'react'
import { addDoc, collection, where, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase-config'
import { useSelector } from "react-redux";
import { RootState } from '../store';
import { TodoList } from '../types';


const AddList = () => {
	const user = useSelector((state: RootState) => state.api.doUser)
	const [newList, setNewList] = useState({
		title: "",
		created_by: user.email as string,
		collaborator: "",
		timestamp: serverTimestamp(),
	});


	const handleCreateList = async () => {
		await addDoc(collection(db, "todolists"), newList);
	};

  return (
	<>
	<Stack flexDirection={"row"} gap={3} justifyContent={"space-evenly"}>
        <Button variant="contained" size="small" sx={{ padding: ".5rem 1rem" }}>
          New todo list
        </Button>
      </Stack>
    <Box display={"flex"} flexDirection={"column"}>
      <h3>List title</h3>
      <TextField
        label={"List title"}
        type={"text"}
        variant={"standard"}
        sx={{ color: "#333" }}
        onChange={(e) =>
			setNewList({
				...newList,
				title: e.target.value,
			})
        }
		/>
      <TextField
        label={"Share with"}
        type={"text"}
        helperText={"Email of your contact"}
        variant={"standard"}
        color={"secondary"}
        onChange={(e) =>
			setNewList({
				...newList,
				collaborator: e.target.value,
			})
        }
		/>
      <Button variant="contained" onClick={handleCreateList}>
        Create list
      </Button>
    </Box>
	</>
  );
}

export default AddList