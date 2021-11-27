import { Grid, Container, Typography, Alert } from '@mui/material';
import React, { useState } from 'react';
import Booking from '../Booking/Booking';

const AvailableAppointments = ({ date }) => {
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const bookings = [
        {
            id: 1,
            name: 'Teeth Orthodonics',
            time: '08.00 AM - 09.00 AM',
            price: 15,
            space: 10,
        },
        {
            id: 2,
            name: 'Cosmetic Dentistry',
            time: '09.00 AM - 10.00 AM',
            price: 19,
            space: 8,
        },
        {
            id: 3,
            name: 'Teeth Cleaning',
            time: '10.00 AM - 11.00 AM',
            price: 17,
            space: 9,
        },
        {
            id: 4,
            name: 'Cavity Protection',
            time: '11.00 AM - 12.00 PM',
            price: 27,
            space: 5,
        },
        {
            id: 5,
            name: 'Pediatric Dental',
            time: '06.00 PM - 07.00 PM',
            price: 25,
            space: 10,
        },
        {
            id: 6,
            name: 'Oral Surgery',
            time: '07.00 PM - 08.00 PM',
            price: 21,
            space: 10,
        },
    ]
    return (
        <Container>
            <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '25px', my: 5 }} className="green" >
                Available Appointments on {date.toDateString()}
            </Typography>
            {
                bookingSuccess &&
                <Alert severity="success">Appointment Booked successfully!</Alert>
            }
            <Grid container spacing={{ xs: 2, md: 3 }} column={{ xs: 6, sm: 8, md: 12 }}>
                {
                    bookings.map(book =>
                        <Booking
                            setBookingSuccess={setBookingSuccess}
                            date={date}
                            booking={book}
                            key={book.id} />)
                }
            </Grid>
        </Container >
    );
};

export default AvailableAppointments;