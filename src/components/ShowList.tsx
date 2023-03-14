import {
  FormControl,
  Grid,
  InputLabel,
  ListItemIcon,
  Box,
  Stack,
  TextField,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import { useState, useEffect } from 'react'
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
} from "firebase/firestore";
import { RootState } from "../store";
import { db } from "../firebase-config";
import { uid } from 'uid'
import { TodoList } from "../types";
// const getTodoLists = async () => {
	// 	const todoLists = query(collection(db, "todolists"), where("created_by", "==", user.email));
	// 	const todoListSnapshot = await getDocs(todoLists)
	// 	const tempList = todoListSnapshot.docs.map((doc) => doc.data()) 
	// 	setListSnap(tempList as TodoList[])
		
	// 	console.log(tempList)
	// }
const ShowList = () => {
	useEffect(() => {
		
  })
  return (
    <Box>
		<h3></h3>
	</Box>
  );
};

export default ShowList;
