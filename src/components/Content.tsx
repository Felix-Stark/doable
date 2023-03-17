import * as React from 'react';
import Paper from '@mui/material/Paper';
import Taskmanager from './Taskmanager';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ChatComp from './ChatComp';



export default function Content() {
  const toggleView = useSelector((state: RootState) => state.api.toggleView)
  const [state, setState] = React.useState({
    right: false,
  });
  

   
  return (
    <Paper sx={{ maxWidth: '100vw', minHeight: '100vh', margin: 'auto', overflow: 'hidden' }}>
        { toggleView ? 
        <Taskmanager /> :
        <ChatComp  /> 
        }
  </Paper>
)}
