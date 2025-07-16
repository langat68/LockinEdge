
import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin } from './Redux/slices/authSlice';
import './App.css';

import Navbar from './Homepage/components/Navbar';
import HeroSection from './Homepage/components/Hero';
import HowItWorks from './Homepage/components/Howitworks';
import CallToAction from './Homepage/components/Action';
import Footer from './Homepage/components/Footer';

import LoginPage from './Homepage/components/LoginForm';
import RegisterPage from './Homepage/components/RegisterForm';
import UploadResume from './components/UploadResume/UploadResume';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // In a real app, you might want to decode the token to get user info
      // or make an API call to validate the token and fetch user details.
      // For now, we'll just set a placeholder user.
      dispatch(setLogin({ token, user: { email: 'persisted_user@example.com' } }));
    }
  }, [dispatch]);

  // Define paths where navbar and footer should NOT be shown
  const isAuthRoute = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isAuthRoute && <Navbar />}
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <HowItWorks />
            <CallToAction />
            <Footer />
          </>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/upload" element={<UploadResume />} />
      </Routes>
    </>
  );
}

export default App;

