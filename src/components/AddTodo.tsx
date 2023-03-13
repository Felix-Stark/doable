
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import { TransitionGroup } from "react-transition-group";
import { Grid,TextField } from "@mui/material";
import { uid } from "uid";
import { auth, db } from "../firebase-config";
import { addDoc, collection, doc, DocumentData, getDoc, getDocs, query, QuerySnapshot, setDoc, SnapshotOptions, where, serverTimestamp, onSnapshot } from 'firebase/firestore'
import { Task } from "@mui/icons-material";
import { Todo, TodoList } from "../types";
import { User } from "firebase/auth";
import { useEffect, useState } from 'react';
import { RootState } from "../store";
import { useSelector } from 'react-redux'


const AddTodo = () => {
	const user = useSelector((state: RootState) => state.api.doUser)
	const selectedList = useSelector((state: RootState) => state.api.currentList)
	
	const [newTodo, setNewTodo] = useState({
		title: '',
		in_list: selectedList,
		is_done: false
	})

	const handleCreateTodo = async () => {
		await addDoc(collection(db, "todos"), newTodo);
	}

  return (
    <Grid
      display={"flex"}
      flexDirection={"column"}
      margin={"0 auto"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {/* <Button onClick={getTodoLists}>Get lists</Button> */}
	  
      <Box>
        <h3>New Todo</h3>
        <TextField
          label={"Title"}
          type={"text"}
          variant={"standard"}
          color={"secondary"}
          value={newTodo.title}
          onChange={(e) =>
            setNewTodo({
              ...newTodo,
              title: e.target.value,
            })
          }
        />

        <Button variant="contained" onClick={handleCreateTodo}>
          Add todo
        </Button>
      </Box>
    </Grid>
  );
};

export default AddTodo;
