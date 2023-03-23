import * as React from 'react';
import Paper from '@mui/material/Paper';
import Taskmanager from './Taskmanager';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ChatComp from './ChatComp';



export default function Content() {
  const showTaskmanager = useSelector((state: RootState) => state.api.showTaskmanager);
  const showChat = useSelector((state: RootState) => state.api.showChat);
  const [state, setState] = React.useState({
    right: false,
  });
  

   
  return (
    <Paper sx={{ maxWidth: '100vw', minHeight: '100vh', margin: 'auto', overflow: 'hidden' }}>
        { showTaskmanager ? 
        <Taskmanager /> : ''
      }
      { showChat ? <ChatComp /> : '' }
  </Paper>
)}
