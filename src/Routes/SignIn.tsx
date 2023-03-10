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
import { collection, doc, setDoc } from "firebase/firestore";
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
  });
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
	username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          const user = result.user;
          getAdditionalUserInfo(result)
        }).catch((error) => alert(error.message)); 

  };


  
  

  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
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
		  
		  return signInWithEmailAndPassword(auth, email, password);
		})
      .catch((err) => alert(err.message));
        navigate("/dashboard");

  };

  const handleRegister = async () => {
    if (registerInfo.email !== registerInfo.confirmEmail) {
      alert("Please confirm that email are correct");
      return;
    } else if (registerInfo.password !== registerInfo.confirmPassword) {
      alert("Please confirm that password are correct");
      return;
    }

    createUserWithEmailAndPassword(
      auth,
      registerInfo.email,
      registerInfo.password
    ).catch((err) => alert(err.message));
	navigate('/user-settings')
	  
  };

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
	zIndex={2000}
	>
        <h1>doable</h1>
        <Grid flexDirection={"column"} alignItems={"center"} spacing={"5"}>
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
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  color="secondary"
                  value={registerInfo.email}
                  onChange={(e) =>
                    setRegisterInfo({ ...registerInfo, email: e.target.value })
                  }
                />
                <TextField
                  label="Confirm Email"
                  variant="outlined"
                  type="email"
                  value={registerInfo.confirmEmail}
                  onChange={(e) =>
                    setRegisterInfo({
                      ...registerInfo,
                      confirmEmail: e.target.value,
                    })
                  }
                />
                <TextField
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
                <TextField
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
              </Box>
              <Stack
                direction={"column"}
                justifyContent={"space-evenly"}
                textAlign={"center"}
                spacing={1}
              >
                <Button variant="contained" onClick={handleRegister}>
                  Register
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setIsRegistering(false)}
                >
                  Go back
                </Button>
              </Stack>
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
                  backdrop: 'blur(8px)'
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
                <Button
                  variant="outlined"
                  onClick={() => setIsRegistering(true)}
                >
                  Create an account
                </Button>
              </Stack>
            </>
          )}
                <Button onClick={googleSignIn} variant="outlined" >
                  Sign in with Google
                </Button>
        </Grid>
      </Grid>
    
  );
}
