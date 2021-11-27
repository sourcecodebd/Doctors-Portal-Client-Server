import { Grid, Container, Button, Paper, Typography, TextField, CircularProgress, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import register from '../../images/login.png';
import useAuth from '../../hooks/useAuth';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {
    // MUI Snackbar starts
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // MUI Snackbar ends

    const [registerData, setRegisterData] = useState({});
    const { firebase } = useAuth();
    const { registerUser, isLoading, success, error, setSuccess, setError, open, setOpen } = firebase;
    const location = useLocation();
    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newRegisterData = { ...registerData };
        newRegisterData[field] = value;
        setRegisterData(newRegisterData);
    }
    const handleRegisterSubmit = e => {
        e.preventDefault();
        if (registerData.password !== registerData.password2) {
            setError("Password didn't matched!");
            setSuccess('');
            setOpen(true);
            return;
        }
        registerUser(registerData.username, registerData.email, registerData.password, location, history);
    }


    return (
        <Container>
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 1 }}>
                <Grid item xs={12} md={5}>
                    {
                        !isLoading ?
                            <Paper elevation={3} sx={{ py: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="body1" className="green" sx={{ fontWeight: 'bold' }} gutterBottom>Register</Typography>
                                <form onSubmit={handleRegisterSubmit}>
                                    <TextField
                                        type="text"
                                        name="username"
                                        onBlur={handleOnBlur}
                                        sx={{ width: "75%", m: 1 }}
                                        id="standard-basic"
                                        label="Your Name"
                                        variant="standard" />
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
                                    <TextField
                                        type="password"
                                        name="password2"
                                        onBlur={handleOnBlur}
                                        sx={{ width: "75%", m: 1 }}
                                        id="standard-basic"
                                        label="Confirm Password"
                                        variant="standard" />
                                    <Button
                                        type="submit"
                                        sx={{ width: "75%", m: 3 }}
                                        variant="contained"
                                        className="bg-green text-white">
                                        Sign Up
                                    </Button>
                                    <NavLink to='/login'>
                                        <Button variant="text" sx={{ fontWeight: 'bold' }}>
                                            Already Registered? Sign In
                                        </Button>
                                    </NavLink>
                                </form>
                            </Paper>
                            :
                            <CircularProgress />
                    }
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={register} style={{ width: '90%' }} alt="" />
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

export default Register;