import { Grid, Container, Typography, TextField, Button, Paper, CircularProgress, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React, { useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import login from '../../images/login.png'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    // MUI Snackbar starts
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // MUI Snackbar ends

    const [loginData, setLoginData] = useState({});
    const { firebase } = useAuth();
    const { loginUser, googleLogin, isLoading, success, error, open, setOpen } = firebase;

    const location = useLocation();
    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, history);
        e.preventDefault();
    }
    const handleGoogleLogin = () => {
        googleLogin(location, history);
    }

    return (
        <Container>
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 1 }}>
                <Grid item xs={12} md={5}>
                    {
                        !isLoading ?
                            <Paper elevation={3} sx={{ py: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="body1" className="green" sx={{ fontWeight: 'bold' }} gutterBottom>Login</Typography>
                                <form onSubmit={handleLoginSubmit}>
                                    <TextField
                                        type="email"
                                        name="email"
                                        onBlur={handleOnBlur}
                                        sx={{ width: "75%", m: 1 }}
                                        id="standard-basic"
                                        label="Your Email"
                                        variant="standard" />
                                    <TextField
                                        type="password"
                                        name="password"
                                        onBlur={handleOnBlur}
                                        sx={{ width: "75%", m: 1 }}
                                        id="standard-basic"
                                        label="Password"
                                        variant="standard" />
                                    <Button
                                        type="submit"
                                        sx={{ width: "75%", m: 3 }}
                                        variant="contained"
                                        className="bg-green text-white">
                                        Sign In
                                    </Button>
                                    <div onClick={handleGoogleLogin} className="rounded-custom bg-danger text-white shadow m-2 p-2 mx-auto"><i className="fab fa-google fa-2x"></i></div>
                                    <NavLink to='/register'>
                                        <Button variant="text" sx={{ fontWeight: 'bold' }}>
                                            New User? Sign Up
                                        </Button>
                                    </NavLink>
                                </form>
                            </Paper>
                            :
                            <CircularProgress />
                    }
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={login} style={{ width: '90%' }} alt="" />
                </Grid>
            </Grid>
            {
                success &&
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} sx={{ transform: 'translateY(-80vh)' }}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {success}
                    </Alert>
                </Snackbar>
            }
            {
                error &&
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} sx={{ transform: 'translateY(-80vh)' }}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            }
        </Container >
    );
};

export default Login;