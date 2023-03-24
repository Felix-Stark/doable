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
    <Paper sx={{ maxWidth: '100vw', height: '100%', position: 'relative'}}>
        { showTaskmanager ? 
        <Taskmanager /> : ''
      }
      { showChat ? <ChatComp content={''} messageId={''} read={false} recived={false} recipient={''} senderId={''} timestamp={''} email={''} /> : '' }
  </Paper>
)}
