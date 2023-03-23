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
  Modal,
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
  collection,
  doc,
  query,
  where,
  updateDoc,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { RootState } from "../store";
import { db } from "../firebase-config";
import { uid } from 'uid'
import { Todo, TodoList } from "../types";
import AddTodo from "./AddTodo";
import { selectedList, todos } from "../features/apiSlice";
import { useCollectionData, useCollectionDataOnce } from "react-firebase-hooks/firestore";


	
const ShowList = () => {
	const currentList = useSelector((state: RootState) => state.api.currentList)
	const user = useSelector((state: RootState) => state.api.doUser)

	const dispatch = useDispatch();
	const [openDelete, setOpenDelete] = useState(false)

  const todoQuery = query(collection(db, "todos"), where('listRef', '==', user.email+currentList), orderBy('timestamp'));
  const [docs, loading, error, snapshot] = useCollectionData(todoQuery);


  const handleCheckChange = (checkedTodo: Todo) => {
    console.log('check changed')
    updateDoc(doc(db, 'todos', checkedTodo.id), {
		is_done: !checkedTodo.is_done
	})
  }
 
  const handleDelete = async (id: string) => {

     await deleteDoc(doc(db, 'todos', id))

  }

  const toggleOpenDelete = () => {
	  setOpenDelete(!openDelete)
  }

  const handleDeleteList = async () => {

    dispatch(selectedList('None'));
    docs?.forEach((todo) => {
      deleteDoc(doc(db, 'todos', todo.id as Todo["id"]));
    })
    deleteDoc(doc(db, 'todolists', user.email+currentList))
    .then(() => {

      toggleOpenDelete()
    })
  }

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      { currentList == 'None' ? '' :
      <Stack flexDirection={"row"}>
        <h3>{currentList}</h3>
        <IconButton onClick={toggleOpenDelete}>
          <DeleteRoundedIcon />
        </IconButton>
      </Stack>
        }
      <List
        sx={{ minWidth: "20rem", border: "2px solid #000", borderRadius: 1 }}
      >
          { loading && 'Loading'}
        { docs?.map((todo) => {
              return (
                <ListItemButton
                  key={todo.id}
                  onClick={() => handleCheckChange(todo as unknown as Todo)}
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Checkbox checked={todo.is_done} />
                  <Typography
                    fontWeight={600}
                    sx={{ flex: "1", paddingLeft: "3rem" }}
                  >
                    {todo.task}
                  </Typography>
                  <IconButton onClick={() => handleDelete( todo.id as Todo["id"])}>
                    <DeleteRoundedIcon />
                  </IconButton>
                </ListItemButton>
              );
            })
          }
        { currentList == 'None' ? '' : <AddTodo />}
      </List>
      <Modal
        open={openDelete}
        onClose={toggleOpenDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: '20rem',
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you want to delete this list?
          </Typography>
          <Stack mt={2} flexDirection={'row'} justifyContent={'space-evenly'}>
            <Button variant="contained" color="warning" onClick={ handleDeleteList }>Yes</Button>
            <Button variant="outlined" color="secondary" onClick={ toggleOpenDelete }>No</Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default ShowList;
