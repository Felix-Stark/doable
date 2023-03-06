import { useEffect, useState } from 'react'
import './App.css'
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import SignIn from './routes/SignIn';
import { ThemeProvider } from '@mui/material/styles'
import { darkTheme } from './Themes';
import NavBar from './components/NavBar';

import Dashboard from './routes/Dashboard';
import UserConfig from './routes/UserConfig';
import { auth } from './firebase-config';
import QuickMenu from './components/QuickMenu';

function App() {
  const [count, setCount] = useState(0)
  const [isUser, setIsUser] = useState<boolean>(false)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsUser(true)
      } else {
        setIsUser(false)
      }
    })
  }, [])


  return (
    <ThemeProvider theme={ darkTheme }>

    <Router>
      {isUser ? <QuickMenu /> : '' }
      <NavBar />
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
