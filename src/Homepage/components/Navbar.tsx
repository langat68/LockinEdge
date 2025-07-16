import { UserCircle, BookOpen, Sparkles, HeadphonesIcon, Lock } from "lucide-react";
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

  const getInitials = (email: string) => {
    if (!email) return "";
    return email.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-inner">
          {/* Left: Logo */}
          <div className="navbar-left">
            <Link to="/" className="navbar-logo">
              <Lock className="logo-icon" />
              <span>lock·in</span>
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

          {/* Right: Avatar / Icon */}
          <div className="navbar-actions">
            <div
              className="user-avatar"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              {isAuthenticated ? (
                getInitials(user?.email)
              ) : (
                <UserCircle className="link-icon" />
              )}
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {isAuthenticated ? (
                  <button onClick={handleLogout}>Logout</button>
                ) : (
                  <Link to="/login" onClick={() => setDropdownOpen(false)}>
                    Sign In
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;