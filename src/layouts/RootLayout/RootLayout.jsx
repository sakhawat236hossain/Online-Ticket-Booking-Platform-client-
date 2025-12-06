import React from 'react';
import NavBar from '../../components/common/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../components/common/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='max-w-[1400px] mx-auto '>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;