import {
  FormControl,
  Grid,
  InputLabel,
  ListItemIcon,
  Box,
  Stack,
  TextField,
  Checkbox,
  Typography,
  IconButton,
  Button,
  ListItemButton,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useState, useEffect, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  setDoc,
  SnapshotOptions,
  where,
  serverTimestamp,
  onSnapshot,
  updateDoc,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { RootState } from "../store";
import { db } from "../firebase-config";
import { uid } from 'uid'
import { Todo, TodoList } from "../types";
import AddTodo from "./AddTodo";
import { todos } from "../features/apiSlice";

	
const ShowList = () => {
	const currentList = useSelector((state: RootState) => state.api.currentList)
	const currentTodos = useSelector((state: RootState) => state.api.currentTodos)
	const addedTodo = useSelector((state: RootState) => state.api.addedTodo)
	const user = useSelector((state: RootState) => state.api.doUser)
	const dispatch = useDispatch();
	const [checked, setChecked] = useState(false)
	const [todoArr, setTodoArr] = useState<Todo[]>([]);
	const [toggleTodoForm, settoggleTodoForm] = useState(false);


	useEffect(() => {
		if( currentTodos.length < 1) {

				onSnapshot(
					query(collection(db, "todos"), where('listRef', '==', user.email+currentList), orderBy('timestamp')),
				(snapshot) => {
					dispatch(todos((snapshot.docs.map((doc) => doc.data()) as Todo[])));
					console.log(
					"todos: ",
					snapshot.docs.map((doc) => doc.data())
					);
					
				}
			);
			  
		}
	}, [])
	
	console.log(currentList)

  const handleCheckChange = (checkedTodo: Todo) => {
	console.log('check changed')
	updateDoc(doc(db, 'todos', checkedTodo.id), {
		is_done: !checkedTodo.is_done
	})
  }

  const handleDelete = async (event: SyntheticEvent, id: string) => {
	event.stopPropagation();
	deleteDoc(doc(db, 'todos', id))
  }		

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <h3>{currentList}</h3>
      <List
        sx={{ minWidth: "20rem", border: "2px solid #000", borderRadius: 1 }}
      >
        {currentTodos
          ? currentTodos.map((todo) => {
              return (
                <ListItemButton
                  key={todo.id}
                  onClick={() => handleCheckChange(todo)}
                  sx={{
					  flexDirection:"row",
					  alignItems:"center"
					  
				  }}
                >
                  <Checkbox checked={todo.is_done} />
                  <Typography
                    fontWeight={600}
                    sx={{ flex: "1", paddingLeft: "3rem" }}
                  >
                    {todo.task}
                  </Typography>
                  <IconButton onClick={(event) => handleDelete(event, todo.id)}>
                    <DeleteRoundedIcon />
                  </IconButton>
                </ListItemButton>
              );
            })
          : ""}
		<AddTodo />
      </List>
	  
    </Box>
  );
};

export default ShowList;
