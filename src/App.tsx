import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import ResumeDetails from './components/ResumeDetails'

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // TODO: replace placeholder user with real decoded token or fetch user info
      dispatch(
        setLogin({
          token,
          user: { email: 'persisted_user@example.com' },
        })
      );
    }
  }, [dispatch]);

  // Paths where navbar/footer should NOT appear
  const isAuthRoute =
    location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!isAuthRoute && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <HowItWorks />
              <CallToAction />
            </>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/resume/:id" element={<ResumeDetails />} />

        {/* fallback route */}
        <Route path="*" element={<h2 style={{ textAlign: 'center' }}>404 - Page Not Found</h2>} />
      </Routes>

      {!isAuthRoute && <Footer />}
    </>
  );
}

export default App;
