import Footer from '@/module/Footer';
import Navbar from '@/module/Navbar';
import React from 'react';

const Layout = ({ children } : {children: React.ReactNode}) => {
    return (
        <div className="bg-background-light-1 dark:bg-background-dark-1 text-text-light dark:text-text-dark  font-Peyda" >
            <Navbar />
            <div className=" min-h-[1750px]  pt-[65px] lg:pt-[85px]" >{ children }</div>
            <Footer />
        </div>
    );
};


export default Layout;