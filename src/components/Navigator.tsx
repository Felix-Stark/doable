import React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import ListIcon from '@mui/icons-material/List';
import MessageIcon from '@mui/icons-material/Message';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


const categories = [
  {
    id: 'Messages',
    icon: <KeyboardArrowDownIcon />,
    active: true,
    children: [
      { id: 'Inbox', icon: <HomeIcon />, active: true },
      { id: 'Starred', icon: <PeopleIcon /> },
      { id: 'Send message', icon: <DnsRoundedIcon /> },
    ],
  },
  {
    id: 'Contacts',
    icon: <KeyboardArrowDownIcon />,
    children: [
      { id: 'All contacts', icon: <PermMediaOutlinedIcon /> },
      { id: 'Groups', icon: <SettingsEthernetIcon /> },
      { id: 'Labels', icon: <SettingsInputComponentIcon /> },
      { id: 'Settings', icon: <TimerIcon /> },
    ],
  },
];


const item = {
  py: '2px',
  px: '4px',
  color: '#FFFFFF',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};



const Navigator = (props: any ) => {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item , ...itemCategory, fontSize: 22, color: '#fff'}} >
        <IconButton color="inherit" sx={{ p: 0.5, backgroundColor: '#FFC61A' }}>
            <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" sx={{backgroundColor: '#FFC61A'}}/>
        </IconButton>
        <ListIcon sx={{fontSize: 22, color: '#fff'}}/>
        <MessageIcon sx={{fontSize: 22, color: '#fff'}}/>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33'}}>
            <ListItemButton sx={item} >
              <ListItemButton sx={{color: '#fff'}}>
                {children ? <KeyboardArrowDownIcon /> : null}
              </ListItemButton>
              <ListItemText primary={id} sx={{color: '#fff'}}/>
            </ListItemButton>
            {children ? (
              <List disablePadding>
                {children.map(({ id: childId, icon }) => (
                  <ListItemButton key={childId} sx={{ ...item, pl: 4.5, color: '#fff' }}>
                    <ListItemIcon sx={{color: '#fff'}}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={childId} sx={{color: '#fff'}}/>
                  </ListItemButton>
                ))}
              </List>
            ) : null}
            <Divider  sx={{ mt:2 }}/>
          </Box>
        ))}
      </List>
      <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
    </Drawer>

  )
}

export default Navigator