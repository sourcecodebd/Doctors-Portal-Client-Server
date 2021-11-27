import { Typography, Button, TextField, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MakeAdmin = () => {
    // MUI Snackbar starts
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // MUI Snackbar ends
    const { firebase } = useAuth();
    const { token, success, setSuccess, setError, open, setOpen } = firebase;

    const [email, setEmail] = useState('');
    const handleOnBlur = e => {
        setEmail(e.target.value);
    }
    let history = useHistory();
    const handleAdminSubmit = e => {
        const newAdmin = { email };
        fetch(`https://agile-headland-44416.herokuapp.com/users/admins`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newAdmin)
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                else if (res.status === 401) {
                    history.push('/');
                    return res.json();
                }
            })
            .then(data => {
                if (data.modifiedCount === 1) {
                    setSuccess('Admin Role given successfully!');
                    setOpen(true);
                    e.target.reset();
                    setError('');
                }
                else {
                    setSuccess('');
                    setError(data.message);
                    setOpen(true);
                }
            })
        e.preventDefault();
    }

    return (
        <div>
            <Typography variant="h5" className="green fw-bold" component="div">
                Make an Admin
            </Typography>
            <form onSubmit={handleAdminSubmit} style={{ display: 'flex', flexDirection: 'column' }} className="col-md-4 mx-auto my-3 gap-3">
                <TextField type="email" name="email" onBlur={handleOnBlur} id="standard-basic" label="Enter an email to make admin" variant="standard" required />
                <Button type="submit" variant="contained" className="bg-green text-white">Continue</Button>
            </form>
            {
                success &&
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} sx={{ transform: 'translateY(-80vh)' }}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {success}
                    </Alert>
                </Snackbar>
            }
        </div>
    );
};

export default MakeAdmin;