import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingCart from './FloatingCart';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />
      <Navbar />
      <main className="flex-grow relative">
        <Outlet />
      </main>
      <FloatingCart />
      <Footer />
    </div>
  );
};

export default MainLayout;
