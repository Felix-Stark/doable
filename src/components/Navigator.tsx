import React, { useEffect, useState } from 'react';
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
import { ReactReduxContext, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { DoableUser } from '../types';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { currentUser, selectedList, toggleTaskmanager } from '../features/apiSlice';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// Add messages

import MessageIcon from '@mui/icons-material/Message';

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


const Navigator = (props: any) => {
  const { ...other } = props;   //  <---  this might be the problem
  const [messagesOpen, setMessagesOpen] = React.useState(false);
  const [contactsOpen, setContactsOpen] = React.useState(false);
  const [todosOpen, setTodosOpen] = React.useState(false);
  const [contacts, setContacts] = React.useState<DoableUser[]>([]);
  const [foundContact, setFoundContact] = useState<DoableUser>()
  const [searchContact, setSearchContact] = React.useState('');
  const user = useSelector((state: RootState) => state.api.doUser)
  const navigate = useNavigate();
  const lightColor = "rgba(255, 255, 255, 0.7)";

  const dispatch = useDispatch();

  const searchQuery = query(collection(db, `users/${user.email}/contacts`));
  const [docs, loading, error] = useCollectionData(searchQuery);

  const listQuery = query(collection(db, 'todolists'), where('participants', 'array-contains', user.email))
  const [todoLists, listLoading, listError, snapshot] = useCollectionData(listQuery, {

  });



  const handleMessagesClicks = () => {
    setMessagesOpen(!messagesOpen);
  };

  // Get contacts from firestore
  const handleContactsClicks = () => {
    setContactsOpen(!contactsOpen);
    
  };

  const handleTodosClicks = () => {
    setTodosOpen(!todosOpen);
  };

  // Get contacts from firestore

  const getSearchContact = async () => {
    const contactData = await getDoc(doc(db, 'users', searchContact))
    if( contactData ) {
		const contactInfo = contactData.data();
		console.log(contactInfo)
		setFoundContact(contactInfo as unknown as DoableUser)
    setSearchContact('');
    }
  };
  // const getContacts = async () => {
  //   const searchQuery = query(collection(db, 'users', user.email, 'contacts'));
  //   const userContacts = await getDocs(searchQuery);
  //   setContacts(userContacts.docs.map(doc => doc.data()) as DoableUser[]);
  //   setContactsOpen(!contactsOpen);
  // }

  const addContact = async () => {
    if (!foundContact) return;
    
    await setDoc(doc(db, 'users', user.email, 'contacts', foundContact?.username as string), foundContact);

    console.log('added contact: ', foundContact)
    
    setFoundContact(undefined);
  }

  const pickAList = (title: string) => {
    dispatch(selectedList(title));
    dispatch(toggleTaskmanager(true));
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
              src={user?.avatar_url ?? ""}
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
          <ListItemText>{user?.username}</ListItemText>
        </ListItem>
        <Box sx={{ bgcolor: "#1C1D22" }}>
          {/* TODOS START */}
          
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
                {user ? todoLists?.map((list: any) => {
                      return (
                        <Box sx={{ display: "flex" }}>
                          <Stack sx={{ display: "flex" }}>
                        <ListItem
                          key={list.id}
                          onClick={() => pickAList(list.title)} sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography 
                            component="span"
                            variant="body2" sx={{ display:"inline" ,color: "#fff" }}>
                            {list.title}
                          </Typography>
                        </ListItem>
                        </Stack>
                        </Box>
                      );
                    })
                  : ""}
              </ListItemButton>
            </List>
          </Collapse>
          {/* MESSAGES START */}
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
          {/* CONTACTS START */}
          <ListItemButton
            onClick={handleContactsClicks}
            sx={{ color: "#fff", py: 2, px: 3 }}
          >
            <ListItemText primary="Contacts" />
            <Divider sx={{ mt: 2, bg: "#1C1D22" }} />
            {contactsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={contactsOpen} timeout="auto" unmountOnExit>
            <Box>
              <List
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                component="div"
              >
                <Stack flexDirection={"row"}>
                  <TextField
                    color={"primary"}
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

                  <IconButton onClick={getSearchContact}>
                    <SearchIcon sx={{ color: "#fff" }} />
                  </IconButton>
                </Stack>

                {foundContact && (
                  <Box
                    sx={{
                      display: "flex",
                      alignContent: "center",
                      width: "100%",
                      height: "3em",
                      maxWidth: 360,
                      bgcolor: "#141416",
                    }}
                  >
                    <ListItemAvatar
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        src={foundContact.avatar_url}
                        alt="My Avatar"
                        sx={{
                          backgroundColor: "#FFC61A",
                          width: 30,
                          height: 30,
                        }}
                      />
                    </ListItemAvatar>
                    <ListItem
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stack>
                        <Typography
                          sx={{ display: "inline", color: "#fff" }}
                          component="span"
                          variant="body2"
                        >
                          {foundContact.username}
                        </Typography>
                        <Typography
                          sx={{
                            display: "inline",
                            color: "#fff",
                            opacity: "0.4",
                            fontSize: 10,
                          }}
                          component="span"
                          variant="body2"
                        >
                          {foundContact.email}
                        </Typography>
                      </Stack>
                      <IconButton
                        sx={{ bgcolor: "#FFC61A", width: 30, height: 30 }}
                        onClick={addContact}
                        disabled={!foundContact}
                      >
                        <AddIcon
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#000",
                            fontSize: 15,
                          }}
                        />
                      </IconButton>
                    </ListItem>
                  </Box>
                )}
              </List>

              <List>
                {contacts &&
                  docs?.map((doc) => {
                    return (
                      <Box
                        sx={{
                          display: "flex",
                          alignContent: "center",
                          width: "100%",
                          height: "3em",
                          maxWidth: 360,
                          bgcolor: "#141416",
                        }}
                        key={doc.email}
                      >
                        <ListItemAvatar
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Avatar
                            src={doc.avatar_url}
                            alt="My Avatar"
                            sx={{
                              backgroundColor: "#FFC61A",
                              width: 30,
                              height: 30,
                            }}
                          />
                        </ListItemAvatar>
                        <ListItem
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Stack>
                            <Typography
                              sx={{ display: "inline", color: "#fff" }}
                              component="span"
                              variant="body2"
                            >
                              {doc.username}
                            </Typography>
                            <Typography
                              sx={{
                                display: "inline",
                                color: "#fff",
                                opacity: "0.4",
                              }}
                              component="span"
                              variant="body2"
                            >
                              {doc.email}
                            </Typography>
                          </Stack>
                          <IconButton
                            sx={{ bgcolor: "#FFC61A", width: 30, height: 30 }}
                            // onClick={addContact}
                          >
                            <MessageIcon
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                fontSize: 15,
                              }}
                            />
                          </IconButton>
                        </ListItem>
                      </Box>
                    );
                  })}
              </List>
            </Box>
          </Collapse>
        </Box>
      </List>
    </Drawer>
  );
}



export default Navigator


// // Dispatch för att lägga till vald kontakt ska sparas i redux state och sen ska den läggas till med recipient valda kontaktens email. 
// // 