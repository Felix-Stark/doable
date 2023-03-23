import React, { useState } from 'react';
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
import { useNavigate } from "react-router";
import { signOut, User } from "firebase/auth";
import { auth } from "../firebase-config";

// To get contacts
import { collection, getDocs , doc , where , query} from "firebase/firestore";
import { db } from "../firebase-config";
import { TextField } from '@mui/material';




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
  const [todosOpen, setTodosOpen] = React.useState(false);
  const [contacts, setContacts] = React.useState([]);
  const [searchContact, setSearchContact] = React.useState('');

  const navigate = useNavigate();
  const lightColor = "rgba(255, 255, 255, 0.7)";


  const handleMessagesClicks = () => {
    setMessagesOpen(!messagesOpen);
  };

  // Get contacts from firestore
  const handleContactsClicks = () => {
    setContactsOpen(!contactsOpen);
    if(!contactsOpen) {
      fetchContacts();
    }
  };

  const handleTodosClicks = () => {
    setTodosOpen(!todosOpen);
  };

  // Get contacts from firestore

  const fetchContacts = async () => {
    const contactsRef = query(collection(db, "users"), where("email", "==", searchContact ));
    const contactsSnapshot = await getDocs(contactsRef);
    
  };

  
  const handleSearchChange = (e: any) => {
    setSearchContact(e.target.value);
  }
  
  
  
  
  const handleSignOut = async ()  => {
    await signOut (auth).catch((err) => {
      alert(err.message);
    }).then(() => {
      navigate("/");
    })
  };
  
  return (
    <Drawer variant="permanent" {...other} >
      <List disablePadding sx={{ bgcolor: '#1C1D22' }}>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff', bgcolor: '#1C1D22' }}>
          <Tooltip title="Your profil">
            <Avatar src="" alt="My Avatar" sx={{backgroundColor: '#FFC61A', width: 45, height: 45}}/>
          </Tooltip>
              <Link
                href="/"
                variant="body2"
                sx={{
                  textDecoration: 'none',
                  color: lightColor,
                  ml: 15,
                  '&:hover': {
                    color: 'common.white',
                  },
                }}
                rel="noopener noreferrer"
                onClick={ handleSignOut}
                >
                Log out
              </Link>
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemText>Your info</ListItemText>
        </ListItem>
          <Box sx={{ bgcolor: '#1C1D22' }}>
            <ListItemButton onClick={ handleTodosClicks } sx={{ color: '#fff', py: 2, px: 3 }}>
                <ListItemText primary="Todos" />
                  {todosOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={todosOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Todos Cards" sx={{ color: '#fff'}}/>
                  </ListItemButton>
                </List>
              </Collapse>
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
            <TextField sx={{ color: '#fff', bgcolor: '#fff', mt: 2, mb: 2, ml: 2, mr: 2 }} id="outlined-basic" label="Search contact" variant="outlined" value={searchContact} onChange={(e) => handleSearchChange(e)} />
            <ListItemButton onClick={ handleContactsClicks } sx={{ color: '#fff', py: 2, px: 3 }}>
                <ListItemText primary="Contacts" />
                  {contactsOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={contactsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {contacts.map((contact: any) => (
                    <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Contact Cards" sx={{ color: '#fff'}}/>
                  </ListItemButton>
                    
                    ))}
                </List>
              </Collapse>
          </Box>
      </List>
    </Drawer>
  )
}
// contactsSnapshot.map().doc


export default Navigator
