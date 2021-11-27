import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Container, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import useAuth from '../../../hooks/useAuth';

const BookingModal = ({ booking, openBooking, handleBookingClose, date, setBookingSuccess }) => {
    const { name, time, price } = booking;
    const { firebase } = useAuth();
    const { user } = firebase;
    const initialInfo = { patientName: user.displayName, email: user.email, phone: '' };
    const [bookingInfo, setBookingInfo] = useState(initialInfo);

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...bookingInfo };
        newInfo[field] = value;
        setBookingInfo(newInfo);
        console.log(newInfo);
    }
    const handleBookingSubmit = e => {
        // collect data from the form
        const appointment = {
            ...bookingInfo,
            serviceName: name,
            price,
            time,
            date: date.toLocaleDateString()
        }
        // send data to server
        console.log(appointment);
        fetch(`https://agile-headland-44416.herokuapp.com/appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointment)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setBookingSuccess(true);
                    handleBookingClose();
                }
            })
        e.preventDefault();
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
        p: 4,
        bgcolor: 'background.paper',
        outline: 'none',
        borderRadius: '12px',
        textAlign: 'center',
    };

    return (
        <Container>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openBooking}
                onClose={handleBookingClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openBooking}>
                    <Box sx={style} className="col-12 col-md-5 mx-auto">
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            {name}
                        </Typography>
                        <form onSubmit={handleBookingSubmit} className="d-flex flex-column gap-3 my-3 text-uppercase">
                            <TextField
                                disabled
                                id="outlined-size-small"
                                defaultValue={time}
                                size="small"
                            />
                            <TextField
                                label="Your Name"
                                name="patientName"
                                onBlur={handleOnBlur}
                                id="outlined-size-small"
                                defaultValue={user.displayName}
                                size="small"
                            />
                            <TextField
                                label="Phone Number"
                                name="phone"
                                onBlur={handleOnBlur}
                                id="outlined-size-small"
                                size="small"
                            />
                            <TextField
                                label="Email"
                                name="email"
                                onBlur={handleOnBlur}
                                id="outlined-size-small"
                                size="small"
                                defaultValue={user.email}
                            />
                            <TextField
                                disabled
                                id="outlined-size-small"
                                size="small"
                                defaultValue={date.toDateString()}
                            />
                            <Button type="submit" variant="contained" className="bg-green">Send</Button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </Container >
    );
};

export default BookingModal;