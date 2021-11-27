import { Typography } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import doctor from '../../../images/doctor.png';
import bg from '../../../images/appointment-bg.png';
import { Button } from '@mui/material';

const appointmentBanner = {
    background: `URL(${bg})`,
    backgroundColor: 'rgba(45, 58, 74, 0.8)',
    backgroundBlendMode: 'darken, multiply',
    marginTop: '175px',
}

const AppointmentBanner = () => {
    return (
        <div>
            <Box style={appointmentBanner} sx={{ flexGrow: 1, p: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                        <img src={doctor} style={{ width: '500px', marginTop: '-130px' }} className="img-fluid" alt="" />
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', textAlign: 'start' }}>
                        <Box>
                            <Typography variant="h6" className="green fw-bold text-uppercase" sx={{ mb: 3 }}>
                                Appointment
                            </Typography>
                            <Typography variant="h4" className="text-white" sx={{ fontSize: '40px' }}>
                                Make an Appointment Today
                            </Typography>
                            <Typography variant="h6" className="white" my={5}>
                                It is a long established fact that a reader will be distracted by the readable content of a page looking at its
                            </Typography>
                            <Button variant="contained" className="bg-green text-white fw-bold">Learn More</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div >
    );
};

export default AppointmentBanner;