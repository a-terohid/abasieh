import Footer from '@/module/Footer';
import Navbar from '@/module/Navbar';
import React from 'react';

const Layout = ({ children } : {children: React.ReactNode}) => {
    return (
        <div className="flex min-h-dvh flex-col bg-bg text-ink font-sans">
            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-50 btn btn-primary btn-sm">پرش به محتوا</a>
            <Navbar />
            <main id="main" className="flex-1">{ children }</main>
            <Footer />
        </div>
    );
};


export default Layout;
