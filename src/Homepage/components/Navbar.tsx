import { Camera, DollarSign, LogIn, PlayCircle } from "lucide-react";
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
            <button className="sign-in-btn">
              <LogIn className="btn-icon" /> Sign In
            </button>
            <button className="get-started-btn">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
