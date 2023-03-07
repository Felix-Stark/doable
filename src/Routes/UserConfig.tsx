import React, { useEffect, useState } from 'react'
import { auth, db } from "../firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";
import { Box, Container, TextField, CardMedia } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { updatePhoneNumber, updateProfile, User } from 'firebase/auth';
import { createTheme, ThemeProvider } from '@mui/system';
import * as theme from '../Themes'

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
	
  	useEffect(() => {
		if (user == null) {
			navigate("/");
		}
  	}, [])

	const handleUpdateInfo = async () => {
    if (user) {
    await setDoc(doc(db, user.uid, 'user_info'), update)
    }
	}

	

  return (

      <>
        <h2>Configure your profile</h2>
        <Button onClick={() => setIsUpdating(true)}>Change</Button>
        {isUpdating ? (
          <Box
            component="form"
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
              required={true}
              color="secondary"
              onChange={(e) =>
                setUpdate({ ...update, username: e.target.value })
              }
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              required={true}
              color="secondary"
              onChange={(e) => setUpdate({ ...update, email: e.target.value })}
            />
            <TextField
              label="Phone number"
              variant="outlined"
              type="tel"
              required={true}
              color="secondary"
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
          ></Box>
        )}
      </>

  );
}

export default UserConfig;