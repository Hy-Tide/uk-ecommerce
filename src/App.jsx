import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import PostcodePopup from './components/common/PostcodePopup';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AOSInitializer = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 0,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <PostcodePopup />
      <AOSInitializer />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
