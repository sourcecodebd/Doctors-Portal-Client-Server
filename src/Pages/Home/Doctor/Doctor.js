import { Grid, Typography } from '@mui/material';
import React from 'react';
import './Doctor.css';

const Doctor = ({ doctor }) => {
    const { name, email, image } = doctor;
    return (
        <div className="doctor shadow">
            <Grid className="doctor-image">
                <img src={`data:image/png;base64, ${image}`} className="img-fluid" alt="" />
            </Grid>
            <Grid className="doctor-body bg-green text-white rounded-3 overflow-auto">
                <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '18px' }} component="div">
                    {name}
                </Typography>
                <Typography variant="h6" sx={{ fontSize: '14px' }} component="div">
                    Doctors Email: {email}
                </Typography>
            </Grid>
        </div>
    );
};

export default Doctor;