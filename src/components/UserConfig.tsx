import React, { useEffect, useState } from 'react'
import { auth, db } from "../firebase-config";
import { doc, setDoc, getDoc, onSnapshot, query, where, collection } from "firebase/firestore";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";
import { Box, Container, TextField, CardMedia, Typography, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { createTheme, ThemeProvider } from '@mui/system';
import * as theme from '../Themes'
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../features/apiSlice';
import { DoableUser } from '../types';
import { RootState } from '../store';
import { User } from 'firebase/auth';

const UserConfig = () => {
  
	const doUser = useSelector((state: RootState) => state.api.doUser)
	const user = auth.currentUser as User;
	const [newUser, setNewUser] = useState(false)

	const [updateDarkmode, setUpdateDarkmode] = useState(true)
	const [updateInfo, setUpdateInfo] = useState({
		username: "" || (doUser.username as string),
		email: doUser.email,
		darkMode: updateDarkmode,
	});
	const [isUpdating, setIsUpdating] = useState(false)
	useEffect(() => {
		// async () => {
		// 	const userRef = doc(db, 'users', user.email as string);
		// 	const userSnap = await getDoc(userRef);
		// 	if( userSnap.exists()) {
		// 		dispatch(currentUser(userSnap.data() as DoableUser))
		// 	} else {
		// 		setNewUser(true)
		// 		setIsUpdating(true)
		// 	}
		// 	console.log(doUser)	
		// }
    const userQuery = query(collection(db, 'users'), where('email', '==', user.email as string))
    onSnapshot(userQuery, (snapshot) => {
      if(snapshot.empty == true) {
        setNewUser(true)
      }
    })
  	}, [])
	
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
  	

	const handleUpdateInfo = async () => {
		if (user) {
			await setDoc(doc(db, 'users', user.email as string), updateInfo)
		}
		setIsUpdating(false)
	}

	const handleIsUpdating = () => {
		{ isUpdating ? setIsUpdating(false) : setIsUpdating(true) }
	}

	const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    	if(e.target.value == 'on') {
			setUpdateDarkmode(true)
		}
		if(e.target.value == 'off') {
			setUpdateDarkmode(false)
		}
  };
	

  return (
    <Grid
      sx={{ minHeight: '' }}
      display={'flex'}

    >
      <h2>Configure your profile</h2>
      <Button onClick={handleIsUpdating}>Change</Button>
      {isUpdating ? (
        <Box

          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            minHeight: "10em",
            width: "70%",
            borderLeft: "2px rgba(0, 0, 0, 0.8)",
          }}
        >
          <TextField
            label="Username"
            helperText="Your visible name"
            variant="outlined"
            type="text"
            required={newUser}
            color="secondary"
            onChange={(e) =>
              setUpdateInfo({ ...updateInfo, username: e.target.value })
            }
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            required={newUser}
            color="secondary"
            onChange={(e) =>
              setUpdateInfo({ ...updateInfo, email: e.target.value })
            }
          />
          <FormControl>
            <FormLabel id='toggle-darkmode'>Darkmode</FormLabel>
            <RadioGroup
              aria-labelledby='toggle-darkmode'
              name='set-darkmode'
              onChange={handleRadioChange}
            >
              <FormControlLabel value={'on'} control={ <Radio />} label={'ON'} />
              <FormControlLabel value={'off'} control={ <Radio />} label={'OFF'} />
            </RadioGroup>
          </FormControl>
          <Button onClick={handleUpdateInfo}>Save changes</Button>
        </Box>
      ) : (
        <Box
          component="section"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            minHeight: "10em",
          }}
        >
          <Stack>
            <Typography variant="h5">Username</Typography>
            <Typography
				variant='body2'
              	sx={{ borderBottom: "2px solid rgba(0,0,0, 0.8)" }}
            >
              {doUser.username}
            </Typography>
          </Stack>
        </Box>
      )}
    </Grid>
  );
}

export default UserConfig;