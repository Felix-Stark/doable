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

  


  return (
    <ThemeProvider theme={ lightTheme }>
        <Router>
          <Routes>
            <Route path="/" element={ <SignIn /> } />
            <Route path='/user-settings' element={ <UserConfig /> } /> 
            <Route path='/dashboard' element={ <Dashboard /> } /> 
          </Routes>
        </Router>
    </ThemeProvider>

  );
}

export default App
