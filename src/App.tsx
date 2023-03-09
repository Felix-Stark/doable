import { useEffect, useState } from 'react'
import './App.css'
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import SignIn from './Routes/SignIn';
import { ThemeProvider } from '@mui/material/styles'
import { darkTheme, lightTheme } from './Themes';
import NavBar from './components/NavBar';

import Dashboard from './Routes/Dashboard';
import UserConfig from './Routes/UserConfig';
import { auth, db } from './firebase-config';

import Grid from '@mui/system/Unstable_Grid/Grid';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { currentUser } from './features/apiSlice';


function App() {
  const [count, setCount] = useState(0)
  const [isUser, setIsUser] = useState<boolean>(false)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged( async (user) => {
      if (user) {
        const userRef = doc(db, user.uid, 'todoLists');
        const userSnap = await getDoc(userRef)
        if(userSnap.exists()) {
          console.log(userSnap.data())
        }
      }
    })

  })


  return (
    <ThemeProvider theme={ darkTheme }>
      <Grid
        container
        flexDirection={"column"}
        spacing={10}
        margin={"0 auto"}
        minWidth={"100vw"}
        minHeight={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ bgcolor: darkTheme.palette?.background?.default }}
      >
        

        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={ <SignIn /> } />
            <Route path='/user-settings' element={ <UserConfig /> } /> 
            <Route path='/dashboard' element={ <Dashboard /> } /> 
          </Routes>
        </Router>

      </Grid>
    </ThemeProvider>

  );
}

export default App
