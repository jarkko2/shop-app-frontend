import React, { useState, useEffect } from 'react';
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

import { useSelector } from "react-redux";

const settings = ['cart', 'orderhistory', 'logout'];

export default function User() {
    const navigate = useNavigate();
    // Material UI // 
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        console.log(event.currentTarget)
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigateToPage = (page) => {
        if (page == "logout") {
            handleLogout();
            navigate(`/shopView`);
            return;
        }
        console.log("Navigating to " + page)
        navigate(`/${page}`);
    };
    ///////////////////////

    const email = useSelector((state) => state.email)
    const handleLogout = async () => {
        Post('users/logout').then(responseData => {
            window.location.reload(true)
        })
    };

    if (email) {
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
                        <MenuItem key={setting} onClick={() => navigateToPage(setting)}>
                            <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </div>
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
