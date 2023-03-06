import React, { useEffect, useState } from 'react'
import { auth, db } from "../firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";
import { Box, Container, TextField, CardMedia } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { updatePhoneNumber, updateProfile, User } from 'firebase/auth';
import { createTheme } from '@mui/system';

const UserConfig = () => {
	const [update, setUpdate] = useState({
		username: '',
		name: '',
		surname: '',
		phoneNumber: '',
		email: '',

	})
	const [isUser, setIsUser] = useState()
	const [isUpdating, setIsUpdating] = useState(false)
	
	const navigate = useNavigate();

	const user = auth.currentUser;
	if(user == null) {
		navigate('/')
	}

	const handleUpdateInfo = async () => {
    await setDoc(doc(db, 'users', update.username), update)
		
	}

	

  return (
    <Grid
      container
      flexDirection={"column"}
      spacing={10}
      margin={"0 auto"}
      minWidth={"100vw"}
      minHeight={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <h2>Configure your profile</h2>
      {isUpdating ? (
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            minHeight: "10em",
            width: '70%',
            borderLeft: '2px rgba(0, 0, 0, 0.8)'
          }}
        >
          <TextField
            label="Username"
            helperText="Your visible name"
            variant="outlined"
            type="text"
            required={true}
            color="secondary"
            value={user?.displayName}
            onChange={(e) => setUpdate({ ...update, username: e.target.value })}
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            required={true}
            color="secondary"
            value={user?.email}
            onChange={(e) => setUpdate({ ...update, email: e.target.value })}
          />
          <TextField
            label="Phone number"
            variant="outlined"
            type="tel"
            required={true}
            color="secondary"
            value={user?.phoneNumber}
            onChange={(e) =>
              setUpdate({ ...update, phoneNumber: e.target.value })
            }
          />

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

        </Box>
      )}
    </Grid>
  );
}

export default UserConfig