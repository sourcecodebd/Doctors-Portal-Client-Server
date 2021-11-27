import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { Button, CircularProgress, Snackbar, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CheckoutForm = ({ appointment }) => {
    // MUI Snackbar starts
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // MUI Snackbar ends

    const { _id, price, patientName } = appointment;
    const stripe = useStripe();
    const elements = useElements();
    const { firebase } = useAuth();
    const { user, success, setSuccess, error, setError, open, setOpen } = firebase;
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    useEffect(() => {
        fetch(`https://agile-headland-44416.herokuapp.com/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));
    }, [price])

    const handleSubmit = async e => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        // get information of CardElement component
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        setProcessing(true);
        // create payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setError(error.message);
            setSuccess('');
            setOpen(true);
        }
        else {
            console.log(paymentMethod);
            setSuccess('Payment Initialized Successfully!');
            setError('');
            setOpen(true);
        }

        // confirm payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patientName,
                        email: user.email
                    },
                },
            },
        );
        if (intentError) {
            setError(intentError.message);
            setSuccess('');
            setOpen(true);
        }
        else {
            console.log(paymentIntent);
            setSuccess('Your Payment processed successfully!');
            setError('');
            setOpen(true);
            setProcessing(false);
            // save to database
            const payment = {
                amount: paymentIntent.amount,
                transaction: paymentIntent.client_secret.split('_secret')[0],
                last4: paymentMethod.card.last4,
                payment_method: paymentMethod.card.brand,
                currency: paymentIntent.currency,
                payment_date: new Date(paymentIntent.created * 1000).toLocaleDateString()
            }
            const URL = `https://agile-headland-44416.herokuapp.com/appointments/${_id}`
            fetch(URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json());
        }
    }

    return (
        <div>
            {
                error &&
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} sx={{ transform: 'translateY(-80vh)' }}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            }
            {
                success &&
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} sx={{ transform: 'translateY(-80vh)' }}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {success}
                    </Alert>
                </Snackbar>
            }
            <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '25px', my: 5 }} className="green" >
                Checkout
            </Typography>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {
                    processing ? <CircularProgress /> :
                        <Button type="submit" disabled={!stripe || success} variant="contained">
                            Pay ${price}
                        </Button>
                }
            </form>
        </div>
    );
};

export default CheckoutForm;