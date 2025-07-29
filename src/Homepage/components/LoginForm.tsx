import { useState } from "react";
import "../Styling/AuthForms.scss";
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../Redux/slices/authSlice';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('https://lockinedge-backend-8.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Dispatch login action to Redux store
        dispatch(setLogin({
          token: data.data.token,
          user: data.data.user
        }));
        
        // Redirect to homepage
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <div className="form-header">
          <h2>Welcome Back</h2>
          <p className="form-subtitle">Sign in to your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message" style={{ 
            color: '#e74c3c', 
            backgroundColor: '#fdf2f2', 
            padding: '10px', 
            borderRadius: '5px', 
            marginBottom: '15px',
            border: '1px solid #e74c3c'
          }}>
            {error}
          </div>
        )}

        {/* Google Sign-In Button */}
        <div className="google-signin-container">
          <div id="google-signin-button"></div>
        </div>

        {/* Divider */}
        <div className="divider">
          <span>or</span>
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <div className="input-wrapper">
            <Mail className="input-icon" size={18} />
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-wrapper">
            <Lock className="input-icon" size={18} />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="form-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="checkmark"></span>
            Remember me
          </label>
          <Link to="/forgot-password" className="forgot-link">
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        {/* Switch to Register */}
        <p className="switch-form">
          Don't have an account? 
          <Link to="/register" className="switch-link">
            Create one here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;