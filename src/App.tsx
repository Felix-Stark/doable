import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import SignIn from './Routes/SignIn';
import { ThemeProvider } from '@mui/material/styles'
import { darkTheme } from './Themes';
import NavBar from './components/NavBar';

import Dashboard from './Routes/Dashboard';
import UserConfig from './Routes/UserConfig';

function App() {
  const [count, setCount] = useState(0)
  const [isUser, setIsUser] = useState<boolean>(false)



  return (
    <ThemeProvider theme={ darkTheme }>

    <Router>
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
