import React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { ExpandLess, ExpandMore, FormatListBulleted, StarBorder } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';
import Tooltip from '@mui/material/Tooltip';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import CommentIcon from '@mui/icons-material/Comment';
import InboxIcon from '@mui/icons-material/Inbox';


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


const Navigator = (props: any ) => {
  const { ...other } = props;
  const [messagesOpen, setMessagesOpen] = React.useState(false);
  const [contactsOpen, setContactsOpen] = React.useState(false);


  const handleMessagesClicks = () => {
    setMessagesOpen(!messagesOpen);
  };

  const handleContactsClicks = () => {
    setContactsOpen(!contactsOpen);
  };


  return (
    <Drawer variant="permanent" {...other} >
      <List disablePadding sx={{ bgcolor: '#1C1D22' }}>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff', bgcolor: '#1C1D22' }}>
          <Tooltip title="Your profil">
            <Avatar src="" alt="My Avatar" sx={{backgroundColor: '#FFC61A'}}/>
          </Tooltip>
        </ListItem>

        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemText>Your info</ListItemText>
        </ListItem>
          <Box sx={{ bgcolor: '#1C1D22' }}>
              <ListItemButton onClick={ handleMessagesClicks } sx={{ color: '#fff', py: 2, px: 3 }}>
                <ListItemText primary="Messages" />
                  {messagesOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={messagesOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Messages Cards" sx={{ color: '#fff'}}/>
                  </ListItemButton>
                </List>
              </Collapse>
            <Divider sx={{ mt: 2, bg: '#1C1D22' }} />
            <ListItemButton onClick={ handleContactsClicks } sx={{ color: '#fff', py: 2, px: 3 }}>
                <ListItemText primary="Contacts" />
                  {contactsOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={contactsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Contact Cards" sx={{ color: '#fff'}}/>
                  </ListItemButton>
                </List>
              </Collapse>
          </Box>
      </List>
    </Drawer>
  )
}

export default Navigator
