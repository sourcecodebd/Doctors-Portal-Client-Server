import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Container, Grid, Paper, TextField, Typography, IconButton, Button, Snackbar } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MuiAlert from '@mui/material/Alert';
import useAuth from '../../../hooks/useAuth';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Input = styled('input')({
    display: 'none',
});

const AddDoctor = () => {
    // MUI Snackbar starts
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // MUI Snackbar ends

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const { firebase } = useAuth();
    const { success, setSuccess, setError, open, setOpen } = firebase;

    const handleAddDoctor = e => {
        e.preventDefault();
        if (!image) {
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('image', image);

        fetch('https://agile-headland-44416.herokuapp.com/doctors', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setSuccess('Doctor added successfully!');
                    setError('');
                    setOpen(true);
                }
            });
    }

    return (
        <div>
            {
                success &&
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} sx={{ transform: 'translateY(-80vh)' }}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {success}
                    </Alert>
                </Snackbar>
            }
            <Typography variant="h5" className="green fw-bold" component="div">
                Add a New Doctor
            </Typography>
            <Container sx={{ mt: 3 }}>
                <Grid item xs={12} sm={12} md={12}>
                    <Paper elevation={3} className="col-md-6 mx-auto" sx={{ py: 6 }}>
                        <form onSubmit={handleAddDoctor}>
                            <TextField
                                type="text"
                                onChange={e => setName(e.target.value)}
                                sx={{ width: '80%' }}
                                label="Name"
                                variant="standard" />
                            <TextField
                                type="email"
                                onChange={e => setEmail(e.target.value)}
                                sx={{ width: '80%' }}
                                label="Email"
                                variant="standard" />
                            <br />
                            <label htmlFor="icon-button-file">
                                <span className="text-secondary">
                                    Upload Profile Picture
                                </span>
                                <Input accept="image/*" onChange={e => setImage(e.target.files[0])} id="icon-button-file" type="file" />
                                <IconButton color="primary" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                            <br />
                            <Button type="submit" variant="contained" startIcon={<AddBoxIcon />} className="mt-2 bg-green text-white">
                                Add
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Container>
        </div>
    );
};

export default AddDoctor;