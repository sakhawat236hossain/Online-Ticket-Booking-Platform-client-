import React from 'react';
import Banner from './HomeComponents/Banner/Banner';
import WhyChooseUs from './HomeComponents/Banner/WhyChooseUs/WhyChooseUs';
import PopularRoutes from './HomeComponents/PopularRoutes/PopularRoutes';
import TravelServices from './HomeComponents/TravelServices/TravelServices';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularRoutes></PopularRoutes>
            <WhyChooseUs></WhyChooseUs>
            <TravelServices></TravelServices>
        </div>
    );
};

export default Home;