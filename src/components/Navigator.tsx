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
import { ExpandLess, ExpandMore, FormatListBulleted, StarBorder } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';
import Tooltip from '@mui/material/Tooltip';
import InsertCommentIcon from '@mui/icons-material/InsertComment';

const categories = [
  {
    id: 'Messages',
    children: [
      { id: 'Inbox', icon: <HomeIcon />},
      { id: 'Starred', icon: <PeopleIcon /> },
      { id: 'Add message', icon: <DnsRoundedIcon /> },
    ],
  },
  {
    id: 'Contacts',
    children: [
      { id: 'Add contacts', icon: <PermMediaOutlinedIcon /> },
      { id: 'Groups', icon: <SettingsEthernetIcon /> },
      { id: 'Settings', icon: <TimerIcon /> },
    ],
  },
];

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
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };



  return (
    <Drawer variant="permanent" {...other} >
      <List disablePadding sx={{ bgcolor: '#1C1D22' }}>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff', bgcolor: '#1C1D22' }}>
        <Tooltip title="Your profil">
          <IconButton color="inherit" sx={{ p: 0.1 }}>
            <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" sx={{backgroundColor: '#FFC61A'}}/>
          </IconButton>
        </Tooltip>
        <FormatListBulleted sx={{color: '#fff', fontSize: 22, fontWeight: 500, ml: 16}}/>
        <InsertCommentIcon sx={{color: '#fff', fontSize: 22, fontWeight: 500, ml: 2}}/>
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemText>Your info</ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#1C1D22' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>
                <Typography variant="subtitle1" fontWeight="bo" >
                {id}
                </Typography>
                </ListItemText>
              </ListItem>
            {children.map(({ id: childId, icon }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton sx={item}>
                  <ListItemText>{childId}</ListItemText>
                  <ListItemIcon>{icon}</ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2, bg: '#1C1D22' }} />
          </Box>
        ))}
      </List>
    </Drawer>
  )
}

export default Navigator
