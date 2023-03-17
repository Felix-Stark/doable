import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';

import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddTodo from './AddTodo';
import AddList from './AddList';
import Taskmanager from './Taskmanager';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ChatComp from './ChatComp';
// Ska vi addera en ternary här som kopplas den till en state som är true/false? och som ändrar innehållet på Content chat eller todo?
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
import { bgcolor, flexbox } from '@mui/system';
import { Collapse, ListItemButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ExpandLess, ExpandMore, Settings } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

type Anchor =  'top' | 'left' | 'bottom' | 'right';

const item = {
  py: 1,
  px: 2.5,
  color: '#FFFFFF',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 2,
};




export default function Content() {
  const toggleView = useSelector((state: RootState) => state.api.toggleView)
  const [state, setState] = React.useState({
    right: false,
  });
  
  const [tasksOpen, setTaskOpen] = React.useState(true);

  const handleTaskClicks = () => {
    setTaskOpen(!tasksOpen);
  };
  
    
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
      >
      <List disablePadding sx={{ bgcolor: '#1C1D22', display: 'flex', flexDirection: 'row' }}>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff', bgcolor: '#1C1D22' }}>
        <CloseIcon onClick={toggleDrawer(anchor, false)}
                    onKeyDown={toggleDrawer(anchor, false)}/>
        <Typography variant="h6" sx={{color: '#fff', fontWeight: 'semibold', fontSize: 16, paddingLeft: 2}}>Contact Info
        </Typography>
        </ListItem>
      </List>
      <List sx={{display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center', paddingTop: 2}}>
            <Avatar src="" alt="My Avatar" sx={{backgroundColor: '#FFC61A' ,width: 95, height: 95}}/>
        <Typography variant="h6" sx={{color: '#fff', fontWeight: '300', fontSize: 16, paddingTop: 2}}>Name
        </Typography>
        <Typography variant="h6" sx={{color: 'grey', fontWeight: '300', fontSize: 16, paddingTop: .5 }}>+46 123 456 789
        </Typography>
      </List>
      <Divider />
      <Box sx={{ bgcolor: '#1C1D22' }}>
            <ListItemButton onClick={ handleTaskClicks } sx={{ color: '#fff', py: 2, px: 3 }}>
                <Settings sx={{ color: '#fff', fontSize: 25, paddingRight: 1 }}/>
                <ListItemText primary="Taskmanager" />
                  {tasksOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={tasksOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Collaborated tasks" sx={{ color: '#fff'}}/>
                    <AddIcon sx={{ color: '#fff', fontSize: 30, paddingRight: 1 }} />
                  </ListItemButton>
                </List>
              </Collapse>
          </Box>
    </Box>
  );

  return (
    <Paper sx={{ maxWidth: '100%', minHeight: '100%', margin: 'auto', overflow: 'hidden' }}>
		<AppBar
			position="static"
			color="default"
			elevation={0}
			sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
		/>

		{ toggleView ? 
		<Taskmanager /> :
		<ChatComp /> 
		}

    <Paper variant="outlined" sx={{ position: 'relative', maxWidth: 936, margin: 'auto', overflow: 'hidden' , height: '100vh' }}>
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}> 
                <AppBar
                  position="static"
                  color="default"
                  elevation={0}
                  sx={{ height:'100vh', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
                >
          <Grid item sx={{bgcolor: 'lightgrey'}} >
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
      <ChatComp />
      </AppBar>
          </React.Fragment>
        ))}
    </Paper>
  );

  </Paper>

)}
