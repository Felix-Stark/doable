import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import ChatComp from './ChatComp';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';




export default function Content() {
  return (
    <Paper sx={{ position: 'relative', maxWidth: 936, margin: 'auto', overflow: 'hidden' , height: '80vh' }}>
        <Grid item >
              <Tooltip title="Show • Contacts info">
                <IconButton color="inherit">
                  <Avatar src="" alt="Contacts Avatar" sx={{backgroundColor: '#FFC61A'}}/>
                </IconButton>
              </Tooltip>
            </Grid>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ height:'100vh', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <ChatComp />
      </AppBar>
    </Paper>
  );
}