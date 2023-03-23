import React, { useEffect, useState } from "react";
import {
	browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { auth, db } from "../firebase-config";
import { collection, doc, setDoc, getDoc, getDocs, where, query } from "firebase/firestore";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";
import { Box, Container, TextField, CardMedia } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
// import * as theme from "../components/theme";

import backdrop from '../assets/backdrop.png'
import { DoableUser } from "../types";
import { BlurOn } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { showLoader } from "../features/apiSlice";

// Google sign in 
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


export default function SignIn() {
  useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if(user) {
          navigate('/dashboard')
        }
      })
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  const [updateDarkmode, setUpdateDarkmode] = useState(false);
  const [disabled, setDisabled] = useState(true)
  const [warning, setWarning] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const googleUser = await signInWithPopup(auth, provider);

    userCheck(googleUser.user)
  };

  const userCheck = async (user: User) => {
    const userEmail = user.email as string
    const userExist = await getDoc(doc(db, 'users', userEmail))
    if( userExist.exists()) {
      navigate('/dashboard')
    } else {
        await setDoc(doc(db, 'users', userEmail as string), {
          username: user.displayName as string,
          email: userEmail,
          avatar_url: user.photoURL,
          darkMode: false,
        })
        navigate('/dashboard')
      }
    
  }



  const handleEmailChange = (e: { target: { value: React.SetStateAction<string> }; }) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };


  const handleSignIn = () => {
	  setPersistence(auth, browserLocalPersistence)
		.then(() => {
      navigate("/");
		  
		  return signInWithEmailAndPassword(auth, email, password);
		})
      .catch((err) => alert(err.message));

  };

  const handleRegister = async () => {
    if (registerInfo.password !== registerInfo.confirmPassword) {
      alert("Please confirm that password are correct");
      return;
    } else {
      createUserWithEmailAndPassword(
        auth,
        registerInfo.email,
        registerInfo.password
      );
      
    }


	  
  };

  const checkUsername = async () => {
    
    // timeout 2s för att inte hämta för varje key
    console.log(registerInfo.username)

      const usernameRef = query(collection(db, 'users'), where('username', '==', registerInfo.username));
      const usernameExists = await getDocs(usernameRef);
      if ( !usernameExists.empty ) {
        setWarning(true);
        setDisabled(true);
      } else {
        setWarning(false);
        setDisabled(false);
        handleRegister();
      }

    }

    

  return (
    
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "10em",
        height: "100vh",
        width: "100vw",
      }}
      zIndex={"2"}
    >
    <CardMedia
    component="img"
    image={backdrop}
    alt="backdrop"
    sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}
  />
      <Grid  textAlign={"center"}  bgcolor={ "white"} borderRadius={"10px"} padding={"2em"} >
      <h1>doable</h1>
        {isRegistering ? (
          <>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                minHeight: "10em",

              }}
              zIndex={"2"}
            >
              <TextField sx={{paddingBottom: "1em"}}
                label="Pick a username"
                error={warning}
                variant="outlined"
                type="username"
                value={ registerInfo.username }
                onChange={ (e) => {
                  setRegisterInfo({
                  ...registerInfo,
                username: e.target.value
                })

                }}

                
              />
              <TextField sx={{paddingBottom: "1em"}}
                label="Email"
                variant="outlined"
                type="email"
                color="secondary"
                value={registerInfo.email}
                onChange={(e) =>
                  setRegisterInfo({
                    ...registerInfo,
                    email: e.target.value
                  })
                }
              />
              <TextField sx={{paddingBottom: "1em"}}
                label="Password"
                variant="outlined"
                type="password"
                value={registerInfo.password}
                onChange={(e) =>
                  setRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  })
                }
              />
              <TextField sx={{paddingBottom: "1em"}}
                label="Confirm password"
                variant="outlined"
                type="password"
                value={registerInfo.confirmPassword}
                onChange={(e) =>
                  setRegisterInfo({
                    ...registerInfo,
                    confirmPassword: e.target.value,
                  })
                }
              />
				<Stack
				direction={"column"}
				justifyContent={"space-evenly"}
				textAlign={"center"}
				spacing={1}
				>
				<Button
					disabled={disabled}
					variant="contained"
					onClick={checkUsername}
				>
					Register
				</Button>
				<Button
					variant="outlined"
					onClick={() => setIsRegistering(false)}
				>
					Go back
				</Button>
				</Stack>
            </Box>
          </>
        ) : (
          <>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                minHeight: "10em",
                backgroundImage: backdrop,
                backdrop: "blur(8px)",
              }}
            >
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                onChange={handleEmailChange}
                value={email}
                
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                onChange={handlePasswordChange}
                value={password}
              />
            </Box>
            <Stack
              direction={"column"}
              justifyContent={"space-evenly"}
              textAlign={"center"}
              spacing={1}
            >
              <Button variant="contained" onClick={handleSignIn}>
                Sign in
              </Button>
              <p>OR</p>
              <Button variant="outlined" onClick={() => setIsRegistering(true)}>
                Create an account
              </Button>
              <Button onClick={googleSignIn} variant="outlined">
                Sign in with Google
              </Button>
            </Stack>
          </>
        )}
      </Grid>
    </Box>
  );
}
