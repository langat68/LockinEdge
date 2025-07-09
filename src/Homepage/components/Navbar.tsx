// Navbar.tsx
import { Camera, DollarSign, LogIn, PlayCircle, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import "../Styling/Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-inner">
          <div className="navbar-left">
            <h1 className="navbar-logo">
              <Camera className="logo-icon" />
              <span>LockinEdge</span>
            </h1>
          </div>

          <div className="navbar-links">
            <a href="#features">
              <PlayCircle className="link-icon" /> Features
            </a>
            <a href="#pricing">
              <DollarSign className="link-icon" /> Pricing
            </a>
          </div>

          <div className="navbar-actions">
            <Link to="/login" className="sign-in-btn">
              <LogIn className="btn-icon" /> Login
            </Link>
            <Link to="/register" className="get-started-btn">
              <UserPlus className="btn-icon" /> Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
