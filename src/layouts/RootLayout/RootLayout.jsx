import React from 'react';
import NavBar from '../../components/common/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../components/common/Footer/Footer';

const RootLayout = () => {
 return (
        <div className='max-w-[1400px] mx-auto'>
            <NavBar></NavBar>
            <div className="min-h-[calc(100vh-200px)]"> 
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;