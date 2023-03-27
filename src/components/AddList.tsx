import React, { SetStateAction } from 'react'
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useState, useEffect } from 'react'
import { addDoc, collection, where, serverTimestamp, doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase-config'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../store';
import { TodoList } from '../types';
import { selectedList } from '../features/apiSlice';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';

type AddListProps = {
  closeListForm: (val: boolean) => void;
  setChosenList: (val: string) => void;
};


const AddList: React.FC<AddListProps> = ({ closeListForm, setChosenList }) => {
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.api.doUser)
	const [colaborator, setColaborator] = useState('')
	const [newList, setNewList] = useState({
		title: "",
		participants: [user.email],
		timestamp: '',
	});


	const handleCreateList = async () => {
		const colaborators = [...newList.participants]
		colaborators.push(colaborator)
		const saveList = {
			...newList,
			participants: colaborators,
			timestamp: dayjs().format(),
		}
		await setDoc(doc(db, "todolists", user.email+saveList.title), saveList).then(() => {
			dispatch(selectedList(saveList.title))
		})
		closeListForm(false)

	};
	

  return (
    <>
      <Box display={"flex"} flexDirection={"column"}>
        <Typography variant="h5" component="h2" >
          Create new list
        </Typography>
        <TextField
          label={"List title"}
          type={"text"}
          variant={"standard"}
          sx={{ color: "#FFC61A" , py: 2}}
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
          sx={{ bgColor: "main"}}

          // color={"secondary"}
          onChange={(e) => setColaborator(e.target.value)}
        />
        <Button 
          variant="contained"
          sx={{ bgColor: "main" }}
          onClick={handleCreateList}
        >
          Create list
        </Button>
      </Box>
    </>
  );
}

export default AddList