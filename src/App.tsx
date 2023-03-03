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
import { darkTheme } from './components/Themes';

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={ darkTheme }>

    <Router>
      <Routes>
        <Route path="/" element={ <SignIn /> } />
      </Routes>
    </Router>
    </ThemeProvider>

  );
}

export default App
