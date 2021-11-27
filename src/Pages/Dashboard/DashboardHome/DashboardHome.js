import React from 'react';
import { Grid } from '@mui/material';
import Calender from '../../Shared/Calender/Calender';
import Appointments from '../Appointments/Appointments';

const DashboardHome = () => {
    const [date, setDate] = React.useState(new Date());

    return (
        <Grid container spacing={{ md: 2 }} sx={{ mx: 'auto' }}>
            <Grid item xs={12} md={4} my={3}>
                <Calender date={date} setDate={setDate} />
            </Grid>
            <Grid item xs={12} md={7}>
                <Appointments date={date} />
            </Grid>
        </Grid>
    );
};

export default DashboardHome;