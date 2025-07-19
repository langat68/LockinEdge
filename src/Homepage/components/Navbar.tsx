import { BookOpen, Sparkles, HeadphonesIcon, Dumbbell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../Redux/store";
import { setLogout } from "../../Redux/slices/authSlice";
import "../Styling/Navbar.scss";
import { useState } from "react";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const getInitials = (email: string | undefined) => {
    if (!email) return "";
    return email.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-inner">
          {/* Left: Logo */}
          <div className="navbar-left">
            <Link to="/" className="navbar-logo">
              <Dumbbell className="logo-icon" />
              <span>lockin</span>
            </Link>
          </div>

          {/* Middle: Links */}
          <div className="navbar-links">
            <a href="#our-story">
              <BookOpen className="link-icon" /> Our Story
            </a>
            <a href="#for-you">
              <Sparkles className="link-icon" /> For You
            </a>
            <Link to="/support">
              <HeadphonesIcon className="link-icon" /> Support
            </Link>
          </div>

          {/* Right: Get Started Button or User Avatar */}
          <div className="navbar-actions">
            {isAuthenticated ? (
              <div className="user-menu">
                <div
                  className="user-avatar"
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                >
                  {getInitials(user?.email)}
                </div>
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item user-info">
                      <span className="user-email">{user?.email}</span>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button 
                      className="dropdown-item logout-btn" 
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="get-started-btn">
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;