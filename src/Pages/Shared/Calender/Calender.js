import React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { Container } from '@mui/material';

const Calender = ({ date, setDate }) => {

    return (
        <Container sx={{ overflow: 'auto' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    value={date}

                    onChange={(newValue) => {
                        setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </Container>
    );
};

export default Calender;