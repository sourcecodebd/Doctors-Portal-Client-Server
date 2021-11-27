import { Container, Grid, Paper, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import React from 'react';

const bannerCardDetails = [
    {
        _id: 1,
        color_code: '#1CC7C1',
        heading: 'Opening Hours',
        desc: 'We are open 7 days',
        Image: AccessTimeIcon,

    },
    {
        _id: 2,
        color_code: '#3A4256',
        heading: 'Visit Our Location',
        desc: 'Brooklyn, NY 10003 USA',
        Image: LocationOnIcon,
    },
    {
        _id: 3,
        color_code: '#1CC7C1',
        heading: 'Call us now',
        desc: '+15697854124',
        Image: WifiCalling3Icon,
    }
];

const BannerBottom = () => {
    return (
        <Container>
            <Grid container spacing={3} className="mt-3">
                {
                    bannerCardDetails.map(({ _id, Image, heading, desc, color_code }) => <Grid key={_id} item xs={12} sm={12} md={4} lg={4}>
                        <Paper variant="outlined" sx={{ display: 'flex', justifyContent: 'space-around', backgroundColor: color_code, color: '#fff', p: 3 }}>
                            <Image sx={{ fontSize: 60 }} />
                            <div>
                                <Typography variant="body1">{heading}</Typography>
                                <Typography variant="subtitle1">{desc}</Typography>
                            </div>
                        </Paper>
                    </Grid>)
                }
            </Grid>
        </Container>
    );
};

export default BannerBottom;