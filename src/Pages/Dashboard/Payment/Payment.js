import { Paper, Typography } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51JwLtkLcEUf0akVM94Xmwc5708Hv7To8b8m7ClyifeiEpa4SMVh2SEq1CkMcLhIe5hFpiJ5A739jNGIMpTrx29jS00VgnOy6oF');

const Payment = () => {
    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState({});
    useEffect(() => {
        fetch(`https://agile-headland-44416.herokuapp.com/appointments/${appointmentId}`)
            .then(res => res.json())
            .then(data => setAppointment(data))
            .catch(err => console.error(err));
    }, [appointmentId])
    return (
        <div>
            <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '25px', my: 5 }} className="green" >
                Please Pay for {appointment.serviceName} Treatment
            </Typography>
            <Paper elevation={3} sx={{ p: 2 }} className="col-md-6 mx-auto">
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '18px', my: 2 }} className="text-secondary">
                    Patient Name: {appointment.patientName}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '18px', my: 2 }} className="text-secondary">
                    Payment Bill: ${appointment.price}
                </Typography>
            </Paper>
            {
                appointment?.price &&
                <Elements stripe={stripePromise}>
                    <CheckoutForm appointment={appointment} />
                </Elements>
            }

        </div>
    );
};

export default Payment;

/*

1. install stripe and stripe-react
2. set Publishable Key
3. Elements
4. Checkout Form
-----
5. create Payment Method
6. server: create Payment Intent API
7. load client secret
8. confirm Card Payment
9. handle user error

*/
