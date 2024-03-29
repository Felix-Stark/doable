import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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




export default function Content() {
  const toggleView = useSelector((state: RootState) => state.api.toggleView)
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

    </Paper>
  );
}