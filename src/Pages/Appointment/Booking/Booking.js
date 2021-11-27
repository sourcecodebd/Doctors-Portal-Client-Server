import { Button, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import BookingModal from '../BookingModal/BookingModal';

const Booking = ({ booking, date, setBookingSuccess }) => {
    const { name, time, price, space } = booking || {};
    const [openBooking, setOpenBooking] = React.useState(false);
    const handleBookingOpen = () => setOpenBooking(true);
    const handleBookingClose = () => setOpenBooking(false);

    return (

        <Grid item xs={12} sm={4} md={4}>
            <Paper elevation={3} sx={{ py: 5, px: 3 }}>
                <Typography variant="h6" className="green" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                    {name}
                </Typography>
                <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                    {time}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold', textTransform: 'uppercase', my: 2 }} gutterBottom component="div">
                    Price ${price}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold', textTransform: 'uppercase', my: 2 }} gutterBottom component="div">
                    {space} spaces available
                </Typography>
                <Button onClick={handleBookingOpen} variant="contained" className="bg-green text-white text-uppercase fw-bold">Book Appointment</Button>
                <BookingModal
                    date={date}
                    booking={booking}
                    openBooking={openBooking}
                    setOpenBooking={setOpenBooking}
                    handleBookingClose={handleBookingClose}
                    setBookingSuccess={setBookingSuccess}
                />
            </Paper>
        </Grid >
    );
};

export default Booking;