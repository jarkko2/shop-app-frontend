import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import './App.css';
import { Outlet, Link, useNavigate } from "react-router-dom";
import Post from './Backend'

// Material UI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const settings = ['cart', 'logout'];
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/x-www-form-urlencoded',
    // Other headers you want to include
};


export default function User() {
    const navigate = useNavigate();
    // Material UI // 
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigateToPage = (page) => {
        if (page == "logout")
        {
            handleLogout();
            navigate(`/shopView`);
            return;
        }
        console.log("Navigating to " + page)
        navigate(`/${page}`);
    };
    ///////////////////////

    const [email, setEmail] = useState('')

    useEffect(() => {
        // Call the onlineCheck function when the component is rendered
        onlineCheck();
    }, []); // Empty dependency array ensures it runs only once


    const onlineCheck = async () => {
        Post('users/onlinecheck').then(responseData => {
          setEmail(responseData.user ? responseData.user.username : "")
        })
    }

    const handleLogout = async (e) => {
        try {
            const response = await axios.post('http://localhost:5001/api/users/logout', qs.stringify({
                // your data
              }), {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                withCredentials: true,
              });
          console.log(response)
          window.location.reload(true)
          // Handle successful logout (redirect or show a message)
        } catch (error) {
          console.error('Logout failed:', error.response);
        }
      };

    function LoggedInView() {
        return (

            <div>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={email.toUpperCase()} src="/static/images/avatar/2.jpg" />
                </IconButton>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {settings.map((setting) => (
                        <MenuItem key={setting}  onClick={() => navigateToPage(setting)}>
                            <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }

    if (email) {
        return (
            <LoggedInView />
        );
    } else {
        return (
            <div>
                <MenuItem key="login" onClick={() => navigateToPage("login")}>
                    <Typography textAlign="center">Login </Typography>
                </MenuItem>
            </div>
        )
    }


}
