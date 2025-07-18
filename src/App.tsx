import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "./Redux/slices/authSlice";
import "./App.css";

import Navbar from "./Homepage/components/Navbar";
import HeroSection from "./Homepage/components/Hero";
import HowItWorks from "./Homepage/components/Howitworks";
import CallToAction from "./Homepage/components/Action";
import Footer from "./Homepage/components/Footer";

import LoginPage from "./Homepage/components/LoginForm";
import RegisterPage from "./Homepage/components/RegisterForm";
import UploadResume from "./components/UploadResume/UploadResume";
import ResumeDetails from "./components/ResumeDetails";

// layout for pages with Navbar & Footer
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("authUser");

    if (token && user) {
      dispatch(
        setLogin({
          token,
          user: JSON.parse(user),
        })
      );
    }
  }, [dispatch]);

  return (
    <Routes>
      {/* Home */}
      <Route
        path="/"
        element={
          <MainLayout>
            <HeroSection />
            <HowItWorks />
            <CallToAction />
          </MainLayout>
        }
      />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Standalone pages */}
      <Route path="/upload" element={<UploadResume />} />
      <Route path="/resume/:id" element={<ResumeDetails />} />

      {/* 404 */}
      <Route
        path="*"
        element={
          <h2 style={{ textAlign: "center" }}>404 - Page Not Found</h2>
        }
      />
    </Routes>
  );
}

export default App;
