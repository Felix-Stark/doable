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
import { Email, ExpandLess, ExpandMore, FormatListBulleted, StarBorder } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router";
import { signOut, User } from "firebase/auth";
import { auth } from "../firebase-config";

// To get contacts
import { collection, getDocs , doc , where , query, getDoc, setDoc} from "firebase/firestore";
import { db } from "../firebase-config";
import { Button, Grid, IconButton, ListItemAvatar, Stack, TextField } from '@mui/material';
import { ReactReduxContext, useSelector } from 'react-redux';
import { RootState } from '../store';
import { DoableUser } from '../types';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';


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
  const [foundContact, setFoundContact] = useState<DoableUser>()
  const [searchContact, setSearchContact] = React.useState('');
  const user = useSelector((state: RootState) => state.api.doUser)
  const navigate = useNavigate();
  const lightColor = "rgba(255, 255, 255, 0.7)";


//   const searchQuery = doc(db, 'users', searchContact);

//   const [docs, loading, error, snapshot] = useDocumentData(searchQuery);

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
    const contactData = await getDoc(doc(db, 'users', searchContact))
    if( contactData ) {
		const contactInfo = contactData.data();
		console.log(contactInfo)
		setFoundContact(contactInfo as unknown as DoableUser)
    setSearchContact('');
    }
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
  
  function generate(arg0: JSX.Element): React.ReactNode {
    throw new Error('Function not implemented.');
  }

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding sx={{ bgcolor: "#1C1D22" }}>
        <ListItem
          sx={{
            ...item,
            ...itemCategory,
            fontSize: 22,
            color: "#fff",
            bgcolor: "#1C1D22",
          }}
        >
          <Tooltip title="Your profil">
            <Avatar
              src=""
              alt="My Avatar"
              sx={{ backgroundColor: "#FFC61A", width: 45, height: 45 }}
            />
          </Tooltip>
          <Link
            href="/"
            variant="body2"
            sx={{
              textDecoration: "none",
              color: lightColor,
              ml: 15,
              "&:hover": {
                color: "common.white",
              },
            }}
            rel="noopener noreferrer"
            onClick={handleSignOut}
          >
            Log out
          </Link>
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemText>Your info</ListItemText>
        </ListItem>
        <Box sx={{ bgcolor: "#1C1D22" }}>
          <ListItemButton
            onClick={handleTodosClicks}
            sx={{ color: "#fff", py: 2, px: 3 }}
          >
            <ListItemText primary="Todos" />
            {todosOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={todosOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Todos Cards" sx={{ color: "#fff" }} />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton
            onClick={handleMessagesClicks}
            sx={{ color: "#fff", py: 2, px: 3 }}
          >
            <ListItemText primary="Messages" />
            {messagesOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={messagesOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Messages Cards" sx={{ color: "#fff" }} />
              </ListItemButton>
            </List>
          </Collapse>
              <ListItemButton
                onClick={handleContactsClicks}
                sx={{ color: "#fff", py: 2, px: 3 }}
              >
          <ListItemText primary="Contacts" />
          <Divider sx={{ mt: 2, bg: "#1C1D22" }} />
            {contactsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={contactsOpen} timeout="auto" unmountOnExit>
            <List sx={{display: 'flex',flexDirection: 'column', alignItems:'center'}} component="div" >
              <Stack flexDirection={"row"}>
              <TextField color={"primary"}
                sx={{
                  bgcolor: "#fff",
                  mt: 2,
                  mb: 2,
                  ml: 2,
                  mr: 2,
                  borderRadius: 1,
                }}
                id="outlined-search"
                placeholder="Search contact"
                variant="outlined"
                value={searchContact}
                onChange={(e) => setSearchContact(e.target.value)}
              />
              
              <Button  onClick={ fetchContacts }><SearchIcon sx={{color:'#fff'}}/></Button>
              </Stack>
              
              { foundContact && (
                      <Box  sx={{display:'flex', alignContent:'center', width: '100%',height:'3em', maxWidth: 360, bgcolor: '#141416' }} >
                            <ListItemAvatar sx={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                              <Avatar
                                  src={foundContact.avatar_url}
                                  alt="My Avatar"
                                  sx={{ backgroundColor: "#FFC61A", width: 30, height: 30 }}
                                /> 
                            </ListItemAvatar>
                            <ListItem sx={{display: 'flex', flexDirection:'row', justifyContent: 'space-between' }}>
                            <Stack>
                              <Typography sx={{ display: 'inline', color:"#fff",  }} component="span" variant="body2">
                                {foundContact.username}
                              </Typography>
                              <Typography sx={{ display: 'inline', color:"#fff", opacity:"0.4" }} component="span" variant="body2">
                                {foundContact.email}
                              </Typography>
                            </Stack>
                            <IconButton sx={{ bgcolor:'#FFC61A', width: 30, height: 30}} >
                              <AddIcon sx={{ display: 'flex',alignItems:'center', justifyContent:'center' ,color: '#000', fontSize: 15 }} />
                            </IconButton>
                          </ListItem>
                          
                          
                      </Box>
              )}
            </List>
          </Collapse>
        </Box>
      </List>
    </Drawer>
  );
}



export default Navigator
