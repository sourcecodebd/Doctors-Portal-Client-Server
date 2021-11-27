import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import Service from '../Service/Service';
import fluoride from '../../../images/fluoride.png';
import cavity from '../../../images/cavity.png';
import whitening from '../../../images/whitening.png';

const Services = () => {

    const services = [
        {
            name: 'Fluoride Treatment',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed culpa cumque enim! Voluptatibus aliquid expedita saepe accusantium itaque ducimus rem voluptas',
            img: fluoride
        },
        {
            name: 'Cavity Filling',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed culpa cumque enim! Voluptatibus aliquid expedita saepe accusantium itaque ducimus rem voluptas',
            img: cavity
        },
        {
            name: 'Teeth Whitening',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed culpa cumque enim! Voluptatibus aliquid expedita saepe accusantium itaque ducimus rem voluptas',
            img: whitening
        }
    ]

    return (
        <div>
            <Typography sx={{ fontWeight: 500, mt: 5, mx: 2 }} variant="h6" component="div" className="green fw-bold">
                OUR SERVICES
            </Typography>
            <Typography sx={{ fontWeight: 600, m: 5, color: 'primary.main' }} variant="h4" component="div">
                Services We Provide
            </Typography>
            <Container>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 12 }}>
                        {
                            services.map((service, index) => (

                                <Service
                                    service={service}
                                    key={index}
                                />
                            ))
                        }
                    </Grid>
                </Box>
                {/* <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {
                            services.map((service, index) => (
                                <Grid item xs={4} sm={4} md={4} key={index}>
                                    <Service
                                        service={service}
                                    />

                                </Grid>
                            ))
                        }
                    </Grid>
                </Box> */}
            </Container>
        </div>
    );
};

export default Services;