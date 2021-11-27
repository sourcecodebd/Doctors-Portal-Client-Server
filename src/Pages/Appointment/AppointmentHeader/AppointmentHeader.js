import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import chair from '../../../images/chair.png'
import Calender from '../../Shared/Calender/Calender';

const AppointmentHeader = ({ date, setDate }) => {

    return (
        <Container>
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'space-around', my: 3 }}>
                <Grid item xs={12} md={4} sx={{ mt: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        Appointment
                    </Typography>
                    <Calender date={date} setDate={setDate} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={chair} style={{ width: "100%" }} alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default AppointmentHeader;