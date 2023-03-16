
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
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
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from "../features/apiSlice";
import * as dayjs from "dayjs";


const AddTodo = () => {
	const user = useSelector((state: RootState) => state.api.doUser)
	const currentList = useSelector((state: RootState) => state.api.currentList)
	const dispatch = useDispatch();
	const [newTodo, setNewTodo] = useState({
		id: '',
		listRef: user.email+currentList,
		task: '',
		in_list: currentList,
    	created_by: user.email,
		is_done: false,
		timestamp: ''
	})
	
	const handleCreateTodo = async () => {
		const saveTodo = {
			...newTodo,
			id: uid(),
			timestamp: dayjs().format(),
		};
		

		await setDoc(doc(db, "todos", saveTodo.id), saveTodo)
		setNewTodo({
			id: "",
			listRef: user.email + currentList,
			task: "",
			in_list: currentList,
			created_by: user.email,
			is_done: false,
			timestamp: "",	
    	});

		console.log('added todo: ', newTodo)
	}

  return (
    
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} >
      <TextField
	  	size="small"
        label={"Task"}
        type={"text"}
        variant={"standard"}
        color={"secondary"}
        value={newTodo.task}

        onChange={(e) =>
          setNewTodo({
            ...newTodo,
            task: e.target.value,
          })
        }
      />

      <IconButton onClick={handleCreateTodo}
		sx={{ padding: 0 }}
		>
			<AddCircleRoundedIcon />
		</IconButton>
    </Box>
  );
};

export default AddTodo;
