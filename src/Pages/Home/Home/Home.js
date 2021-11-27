import React from 'react';
import Navigation from '../../Shared/Navigation/Navigation';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import useAuth from '../../../hooks/useAuth';
import Footer from '../../Shared/Footer/Footer';
import BannerBottom from '../BannerBottom/BannerBottom';
import Doctors from '../Doctors/Doctors';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Home = () => {
    // MUI Snackbar starts
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // MUI Snackbar ends
    const { firebase } = useAuth();
    const { error, open, setOpen } = firebase;

    return (
        <div>
            <Navigation />
            <Banner />
            <BannerBottom />
            <Services />
            <Doctors />
            <AppointmentBanner />
            <Footer />
            {
                error &&
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} sx={{ transform: 'translateY(-80vh)' }}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            }
        </div>
    );
};

export default Home;