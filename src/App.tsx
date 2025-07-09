import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import Navbar from './Homepage/components/Navbar';
import HeroSection from './Homepage/components/Hero';
import HowItWorks from './Homepage/components/Howitworks';
import CallToAction from './Homepage/components/Action';
import Footer from './Homepage/components/Footer';

import LoginPage from './Homepage/components/LoginForm';
import RegisterPage from './Homepage/components/RegisterForm';

function App() {
  const location = useLocation();

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
      </Routes>
    </>
  );
}

export default App;
