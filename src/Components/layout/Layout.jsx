import { useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Outlet, useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemIcon } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './layout.css'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function LayoutComponent({children}) {
  
    const navigate = useNavigate();

    const moveToHome = () => {
        navigate('/home');
    }

    const moveToHistory = () => {
        navigate('/home/history');
    }

    const handleLogout = () => {
        localStorage.clear();   
        navigate('/');
    }

  return (
    <div className='layout'>
        <Grid container spacing={1}>
            <Grid item xs={2} rowSpacing={3} className='layout-content'>
                <div className='layout-nav'>
                    <List className='layout-nav-list'>
                        <ListItem button onClick={moveToHome}  className='layout-nav-list-item'> 
                            <ListItemIcon className='text-center-flex'> <HomeIcon fontSize="large" color="secondary" /></ListItemIcon>
                        </ListItem>

                        <ListItem button onClick={moveToHistory} className='layout-nav-list-item'>
                            <ListItemIcon className='text-center-flex'> <HistoryIcon fontSize="large" color="secondary" /></ListItemIcon>
                        </ListItem>
                    </List>
                    <List className='layout-nav-list'>
                        <ListItem button className='layout-nav-list-item'>
                            <ListItemIcon className='text-center-flex'> <AccountCircleIcon fontSize="large" color="secondary" /></ListItemIcon>
                        </ListItem>

                        <ListItem button className='layout-nav-list-item'>
                            <ListItemIcon className='text-center-flex' onClick={handleLogout}> <ExitToAppIcon fontSize="large" color="secondary" /></ListItemIcon>
                        </ListItem>
                    </List>
                </div>
            </Grid>
            <Grid item xs={10}>
                <Outlet/>
            </Grid>
        </Grid>
    </div>
  )
};

export default LayoutComponent;