import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { useNavigate } from "react-router-dom";

// Material UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Post from './Backend'
import { useSelector } from 'react-redux'

const defaultTheme = createTheme();

function Register() {
    const navigate = useNavigate();
    const email = useSelector((state) => state.email)

    const handleSignup = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const data = new FormData(e.currentTarget);
        const username = data.get('username')
        const name = data.get('name')
        const email = data.get('email')
        const password = data.get('password')
        const passwordConfirmation = data.get('repeatpassword')
        console.log({ username, name, email, password, passwordConfirmation })
        Post('users/register', { username, name, email, password, passwordConfirmation }, true).then(responseData => {
            console.log(responseData.data.status)
            if (responseData.status === 200) {
                navigate('/login')
            } else {
                console.log("Something went wrong!")
            }

        })
    };

    function RegisterForm() {
        return (
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autofocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autofocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                type="email"
                                autofocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autofocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="repeatpassword"
                                label="Repeat password"
                                type="password"
                                id="repeatpassword"
                                autofocus
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign up
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="login" variant="body2">
                                        {"Already have an account? Sign in"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        )
    }

    if (email) {
        navigate(`/shopView`);
        return;
    }
    else {
        return (
            <div>
                <RegisterForm />
            </div>
        );
    }
}

export default Register;
