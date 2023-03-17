import { useRef, useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, limit, where } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import SendMessage from "./SendMessage";
import Messages from "./Messages";
import { Message } from "../types";
import { Box, flexbox } from '@mui/system';
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import { ExpandLess, ExpandMore, Settings } from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from "react-redux";
import { RootState } from "../store";
import CloseIcon from '@mui/icons-material/Close';
import Drawer from "@mui/material/Drawer";


// Lägger in Ikonen så den enbart syns i Chat flik 
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



const ChatComp = () => {
  

  const [state, setState] = React.useState({
    right: false,
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [tasksOpen, setTaskOpen] = React.useState(true);

  const scroll = useRef<HTMLSpanElement>(null);

  const handleTaskClicks = () => {
    setTaskOpen(!tasksOpen);
  };
  
    
    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if ( event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

    
    useEffect(() => {
      const conversation = query(collection(db, "messages"), orderBy("createdAt"), limit(50));
  
      const unsubscribe = onSnapshot(conversation, (QuerySnapShot) => {
        let messages: any = [];
        QuerySnapShot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        setMessages(messages);
      });
      return unsubscribe;
    }, []);
    
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
    <>
      <Box sx={{ height: '100vh' }}>
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}> 
          <Grid item sx={{bgcolor: '#26272D'}} >
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
        {messages?.map((message) => (
          <Messages key={message.id} message={message} />  
        ))}
      </Box>
      <Box component="span" ref={scroll} ></Box>
      <Box sx={{ display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center'}} >
        <SendMessage scroll={scroll} />
      </Box>
  </>
  );
};

export default ChatComp;
