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

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Advertisement></Advertisement>
            <LatestTickets></LatestTickets>
            <WhyChooseUs></WhyChooseUs>
            <TravelServices></TravelServices>
            <PopularRoutes></PopularRoutes>
            <BookingFAQ></BookingFAQ>
            <FeedbackForm></FeedbackForm>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;