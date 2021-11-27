import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import Doctor from '../Doctor/Doctor';
import { Typography } from '@mui/material';

// install Swiper modules
SwiperCore.use([Autoplay]);
SwiperCore.use([Pagination]);

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        fetch(`https://agile-headland-44416.herokuapp.com/doctors`)
            .then(res => res.json())
            .then(data => setDoctors(data));
    }, [])

    return (
        <>
            <Typography variant="h4" sx={{ fontWeight: 'bold', my: 5 }} color="primary" component="div">
                Our {doctors.length ? doctors.length + ' Specialized Doctors' : 0 + ' Specialized Doctor'}
            </Typography>
            <Swiper slidesPerView={1} spaceBetween={10}
                autoplay={{ delay: 3000 }}
                pagination={{
                    "clickable": true
                }} breakpoints={{
                    "640": {
                        "slidesPerView": 2,
                        "spaceBetween": 20
                    },
                    "768": {
                        "slidesPerView": 2,
                        "spaceBetween": 40
                    },
                    "1024": {
                        "slidesPerView": 3,
                        "spaceBetween": 50
                    }
                }} className="mySwiper">
                {
                    doctors.map(doctor =>
                        <SwiperSlide key={doctor._id}>
                            <Doctor doctor={doctor} />
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </>
    );
};

export default Doctors;