import React, { useEffect, useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';


const Appointments = ({ date }) => {
    const { firebase } = useAuth();
    const { user, token, setError, setOpen } = firebase;
    const [appointments, setAppointments] = useState([]);
    const selectedDate = new Date(date).toLocaleDateString();
    // console.log('with new Date(): ', new Date(date).toLocaleDateString());
    // console.log('without new Date(): ', date.toLocaleDateString());

    let history = useHistory();
    useEffect(() => {
        fetch(`https://agile-headland-44416.herokuapp.com/appointments?email=${user.email}&&date=${selectedDate}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('idToken')}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                else if (res.status === 401) {
                    history.push('/home');
                    return res.json();
                }
            })
            .then(data => {
                setAppointments(data);
                console.log(data);
            });
    }, [user.email, selectedDate, token, history, setError, setOpen]);

    return (
        <Container>
            {
                appointments.length !== 0 ?
                    <Container>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '25px', my: 5 }} className="green" >
                            Total Appointments: {appointments.length}
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table aria-label="Appointments table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Time</TableCell>
                                        <TableCell align="right">Service</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {appointments.map((row) => (
                                        <TableRow
                                            key={row._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.patientName}
                                            </TableCell>
                                            <TableCell align="right">{row.time}</TableCell>
                                            <TableCell align="right">{row.serviceName}</TableCell>
                                            <TableCell align="right">
                                                {row.payment ? 'Paid' :
                                                    <Link to={`/dashboard/payment/${row._id}`}>
                                                        <Button variant="contained" className="bg-green text-white">Pay</Button>
                                                    </Link>
                                                }</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
                    :
                    <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '25px', my: 5 }} className="green" >
                        No Appointment placed on this day!
                    </Typography>
            }
        </Container >
    );
};

export default Appointments;