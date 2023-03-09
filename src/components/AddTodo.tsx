
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
import { FormControl, Grid, InputLabel, ListItemIcon, MenuItem, Select, Stack, TextField } from "@mui/material";
import { uid } from "uid";
import { auth, db } from "../firebase-config";
import { addDoc, collection, doc, DocumentData, getDoc, getDocs, query, QuerySnapshot, setDoc, SnapshotOptions, where, serverTimestamp, onSnapshot } from 'firebase/firestore'
import { Task } from "@mui/icons-material";
import { Todo, TodoList } from "../types";
import { User } from "firebase/auth";
import { useEffect, useState } from 'react';


const AddTodo = () => {
	useEffect(() => {
    if (auth.currentUser !== null) {
      setUser({
        ...user,
        uid: auth.currentUser.uid,
        email: auth.currentUser.email as string,
      });

      onSnapshot(query(collection(db, "todolists"), where("created_by", "==", user.email)), (snapshot) => {
		setListSnap(snapshot.docs.map((doc) => doc.data()) as TodoList[])
	  })
	  
	  
    }
  });
	const [listSnap, setListSnap] = useState<TodoList[]>([]);

	const [user, setUser] = useState({
		uid: '',
		email: '',
	})
	const [newList, setNewList] = useState({
		title: '',
		created_by: user.email as string,
		collaborator: '',
		timestamp: serverTimestamp(),
	})
	const [newTodo, setNewTodo] = useState({
		title: '',
		in_list: '',
		is_done: false
	})

	const [selectedList, setSelectedList] = useState('') //list.title

	


	const handleCreateList = async () => {
		await addDoc(collection(db, 'todolists'), newList)
	}

	const handleCreateTodo = async () => {
		await addDoc(collection(db, "todos"), newTodo);
	}

	// const getTodoLists = async () => {
	// 	const todoLists = query(collection(db, "todolists"), where("created_by", "==", user.email));
	// 	const todoListSnapshot = await getDocs(todoLists)
	// 	const tempList = todoListSnapshot.docs.map((doc) => doc.data()) 
	// 	setListSnap(tempList as TodoList[])
		
	// 	console.log(tempList)
	// }

	const handleSelectList = () => {

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
      <FormControl fullWidth>
        <InputLabel id="select-list">Select list</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="select-list"
          value={selectedList}
          label="Age"
          onChange={handleSelectList}
        >
          {listSnap
            ? listSnap.map((list) => {
                return (
                  <MenuItem value={list.title} key={uid()}>
                    {list.title}
                  </MenuItem>
                );
              })
            : ""}
        </Select>
      </FormControl>
      <Stack flexDirection={"row"} gap={3} justifyContent={"space-evenly"}>
        <Button variant="contained" size="small" sx={{ padding: ".5rem 1rem" }}>
          New todo list
        </Button>
        {/* <p>or</p>
        <Button variant="contained" aria-label="Advanced options">
          New task
        </Button> */}
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
      <List>
        {/* {listSnap
          ? listSnap.map((list) => {
              return (
                <ListItem key={uid()}>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary={list.title} />
                </ListItem>
              );
            })
          : ""} */}
      </List>
    </Grid>
  );
};

export default AddTodo;
