import { useRef, useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, limit, where } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import SendMessage from "./SendMessage";
// import Messages from "./Messages";
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
import { Message } from "../types";
import { styled } from '@mui/material/styles';
import { useAuthState } from 'react-firebase-hooks/auth';



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

interface ChatCompProps {
  content: string;
  messageId: string;
  read: boolean;
  recived: boolean;
  recipient: string;
  senderId: string;
  timestamp: string;
  email: string;
}


const ChatComp = (props: ChatCompProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [tasksOpen, setTaskOpen] = React.useState(true);
  const user = useSelector((state: RootState) => state.api.doUser)
  const [state, setState] = React.useState({
    right: false,
  });

  useEffect(() => {
    const conversation = query(collection(db, "messages"), where('senderId', '==', user.email), orderBy("timestamp"), limit(50));
    onSnapshot(conversation, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()) as unknown as Message[])
      
    })
  }, []);
  
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
            <Avatar src="" alt="" sx={{backgroundColor: '#FFC61A' ,width: 95, height: 95}}/>
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

  interface ChatBubbleProps {
    alignRight: boolean;
  }
  
  const ChatBubble = styled('div')<ChatBubbleProps>(({ theme, alignRight }) => ({
    display: 'flex',
    flexDirection: alignRight ? 'row-reverse' : 'row',
    alignItems: 'flex-end',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }));
  
  // const Avatar = styled('img')(({ theme }) => ({
  //   width: '50px',
  //   height: '50px',
  //   marginRight: theme.spacing(1),
  //   borderRadius: '50%',
  // }));
  
  const ChatBubbleRight = styled('div')<ChatBubbleProps>(({ theme, alignRight }) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: alignRight ? '#BDD2B6' : '#3A3A3A',
    padding: theme.spacing(1),
    borderRadius: '10px',
    maxWidth: '60%',
  }));



  return (
    <>
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}> 
          <Grid item sx={{bgcolor: '#26272D'}} >
              <Tooltip title="Show • Contacts info">
                <IconButton color="inherit" onClick={toggleDrawer(anchor,true)}>
                  <Avatar src="" alt="" sx={{backgroundColor: '#FFC61A'}}/>
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
      <Box position={ 'relative' } overflow={ 'scroll' } width={ '100%' } minHeight={'100%'} display={'flex'} flexDirection={ 'column' } justifyContent={ 'flex-end' }
        
      >
        {/* {messages?.map((messages) => {
          return (<Messages key={messages.timestamp} messageId={messages.content} senderId={""} recipientId={""} content={""} timestamp={""} avatar_url={""} recevied={false} read={false}   />  )
        })} */}
        { messages? messages.map((message) => {
          return (

            <ChatBubble key={message.timestamp} alignRight={message.senderId === user.email}>
              <Avatar sx={{width: "1.5em", height: "1.5em"}} src={user.avatar_url} alt="avatar" />
              <ChatBubbleRight alignRight={message.senderId === user.email}>
                <Typography >{message.content}</Typography>
              </ChatBubbleRight>
              {/* <Typography >{message.timestamp}</Typography> */}
            </ChatBubble>
            
            )
          })
        : ''}
        <Box component="span" ref={scroll} ></Box>
        <Box sx={{ display: 'flex',  justifyContent: 'center', alignItems: 'center', backgroundColor: 
        '#000' }} >
          <SendMessage scroll={scroll}  />
        </Box>
      </Box>
  </>
  );
};

export default ChatComp;
