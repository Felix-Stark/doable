import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";
import { Grid, MenuItem, Select, Stack, TextField } from "@mui/material";
import { uid } from "uid";
import { auth, db } from "../firebase-config";
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { Task } from "@mui/icons-material";
import { Todo, TodoList } from "../types";


const AddTodo = () => {
	const [creatingList, setCreatingList] = React.useState(false)
	const [creatingTodo, setCreatingTodo] = React.useState(false)
	const [creatingTask, setCreatingTask] = React.useState(false)
	const [userLists, setUserLists] = React.useState<any>()
	const [selectedList, setSelectedList] = React.useState('')
	const [newTodo, setNewTodo] = React.useState<Todo>({
		id: '',
		title: '',
		is_done: false
	})
	const [newList, setNewList] = React.useState<TodoList>({
		listId: '',
		title: '',
		created_by: '',
		shared_with: '',
	})
	//todolist path: users/user.id/todolists/todolisttitle
	const handleCreateList = async () => {
		setSelectedList(newList.title)
		setNewList({
			...newList,
			listId: uid(),
		})

		
		if ( auth.currentUser  ) {

		await addDoc(collection(db, auth.currentUser.uid, 'todoLists', newList.title ), newList)

		}
		console.log('newList: ', newList)

	}

  const handleCreateTodo = async () => {
    const todoToAdd = {
      id: uid(),
      title: newTodo.title,
      is_done: false
    };
    if (auth.currentUser) {
      await addDoc(
        collection(db, "users", auth.currentUser.uid, "todoLists", selectedList, "todos"),
        todoToAdd
      );
    }
  };
  
	

	const getTodoLists = async () => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const userRef = doc(db, user.uid, "todoLists");
				const todoListSnap = await getDoc(userRef);
				if (todoListSnap.exists()) {
				console.log(todoListSnap.data());
				setUserLists(todoListSnap.data())
				}
			}
    	});
	}

//skapa todolista eller task -> 

  return (
    <Grid
		display={'flex'}
      flexDirection={"column"}
      margin={"0 auto"}
      justifyContent={"center"}
      alignItems={"center"}
    >
		<Button onClick={getTodoLists}>Get lists</Button>
      <Stack flexDirection={"row"} gap={3} justifyContent={"space-evenly"}>
        <Button variant="contained" aria-label="Simple todo">
          New todo list
        </Button>
        <p>or</p>
        <Button variant="contained" aria-label="Advanced options">
          New task
        </Button>
      </Stack>
      <Box 
	  	display={'flex'}
		flexDirection={'column'}

	  >
        <h3>List title</h3>
        <TextField
          label={"List title"}
          type={"text"}
          variant={"standard"}
			sx={{ color: '#333'}}
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
          variant={"standard"}
          color={"secondary"}
          onChange={(e) =>
            setNewList({
              ...newList,
              shared_with: e.target.value,
            })
          }
        />
        <Button variant="contained" onClick={handleCreateList}>Create list</Button>
      </Box>
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
        <Button variant="contained" onClick={handleCreateTodo}>Add to list</Button>
      </Box>
    </Grid>
  );
};

export default AddTodo;
