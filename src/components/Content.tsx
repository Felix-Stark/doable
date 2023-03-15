import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import ChatComp from './ChatComp';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/Inbox';
import Drawer from '@mui/material/Drawer';
import { flexbox } from '@mui/system';

type Anchor =  'top' | 'left' | 'bottom' | 'right';



export default function Content() {
  const [state, setState] = React.useState({
    right: false,
  });


  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if ( event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ flexbox: 'center' }}>
      <Tooltip title="Your profil">
            <Avatar src="" alt="My Avatar" sx={{backgroundColor: '#FFC61A', flexbox: 'center' }}/>
          </Tooltip>
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} sx={{ color: '#fff'}}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Paper variant="outlined" sx={{ position: 'relative', maxWidth: 936, margin: 'auto', overflow: 'hidden' , height: '100vh' }}>
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}> 
          <Grid item >
                <Tooltip title="Show • Contacts info">
                  <IconButton color="inherit" onClick={toggleDrawer(anchor,true)}>
                    <Avatar src="" alt="Contacts Avatar" sx={{backgroundColor: '#FFC61A'}}/>
                  </IconButton>
                </Tooltip>
                <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
              </Grid>
          </React.Fragment>
        ))}
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
