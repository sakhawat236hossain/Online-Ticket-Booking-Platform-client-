import React from 'react';
import Banner from './HomeComponents/Banner/Banner';
import WhyChooseUs from './HomeComponents/Banner/WhyChooseUs/WhyChooseUs';
import PopularRoutes from './HomeComponents/PopularRoutes/PopularRoutes';
import TravelServices from './HomeComponents/TravelServices/TravelServices';
import Advertisement from './Advertisement/Advertisement';
import LatestTickets from './LatestTickets/LatestTickets';
import BookingFAQ from './BookingFAQ/BookingFAQ';
import FeedbackForm from './FeedbackForm/FeedbackForm';
import Testimonials from './Testimonials/Testimonials';
import StatsCounter from './StatsCounter/StatsCounter';

const Home = () => {
   
    return (
        <div>
            <Banner />

            <Advertisement />

            <WhyChooseUs />

            <StatsCounter />

            <TravelServices />

            <LatestTickets />

            <PopularRoutes />

            <Testimonials />

            <BookingFAQ />

            <FeedbackForm />
        </div>
    );
};


export default Home;