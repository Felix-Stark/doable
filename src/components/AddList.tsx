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
          onChange={(e) => setColaborator(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ bgColor: "#63ccff" }}
          onClick={handleCreateList}
        >
          Create list
        </Button>
      </Box>
    </>
  );
}

export default AddList