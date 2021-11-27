import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Grid';
import chair from '../../../images/chair.png';
import bg from '../../../images/bg.png';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

const bannerBg = {
    background: `URL(${bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    height: '500px'
}
const verticleCenter = {
    display: 'flex',
}

const Banner = () => {
    return (
        <div style={bannerBg} className="my-md-3 mb-5">
            <Container sx={{ flexGrow: 1, }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 8, md: 12 }} sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Grid item xs={12} sm={4} md={4} sx={{ textAlign: 'left', ...verticleCenter, mt: 5 }}>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }} mb={3}>
                                Your New Smile <br />
                                Starts Here
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ fontSize: 14 }} mb={2}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quos neque omnis fugit quidem voluptas. Obcaecati dolorem dolores, debitis asperiores quisquam natus. Nobis sunt cumque eius quidem enim quod atque.
                            </Typography>
                            <Link to="/appointment">
                                <Button variant="contained" className="bg-green text-white fw-bold">Get Appointment</Button>
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={6} style={{ verticleCenter }}>
                        <Box sx={{ backgroundColor: '#3A4256', height: 600, }}>
                            <img src={chair} style={{ width: '550px' }} className="img-fluid my-5" alt="" />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div >
    );
};

export default Banner;