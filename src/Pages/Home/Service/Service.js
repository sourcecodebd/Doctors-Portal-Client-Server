import Grid from '@mui/material/Grid';
import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Service = ({ service }) => {
    const { name, description, img } = service;
    return (
        <>
            <Grid item xs={5} sm={4} md={4} className="mx-auto" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card sx={{ minWidth: 230, padding: '20px 10px', height: '340px', overflow: 'auto' }} className="cards">
                    <CardMedia
                        component="img"
                        style={{ width: "auto", height: "auto", margin: "auto" }}
                        image={img}
                        alt={name}
                    />
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {description.slice(0, 100) + '...'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" className="fw-bold">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>

            {/* <div>
            <img src={img} alt={name} />
            <p>{name}</p>
            <p>{description}</p>
        </div> */}
        </>
    );
};

export default Service;