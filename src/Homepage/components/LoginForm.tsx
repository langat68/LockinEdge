import { useState, useEffect } from "react";
import "../Styling/AuthForms.scss";
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../Redux/slices/authSlice';

// Google Sign-In types
declare global {
  interface Window {
    google: any;
    handleGoogleSignIn: (response: any) => void;
  }
}

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Replace with your actual Google Client ID
  const GOOGLE_CLIENT_ID = "802590327760-0nt29rm0d3rttv4j6eh8atb9kvoqeifg.apps.googleusercontent.com";

  useEffect(() => {
    // Load Google Sign-In script
    const loadGoogleScript = () => {
      if (window.google) {
        initializeGoogleSignIn();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      script.onerror = () => {
        console.error('Failed to load Google Sign-In script');
        setError('Failed to load Google Sign-In. Please refresh the page.');
      };
      document.head.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      try {
        if (window.google && window.google.accounts) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
            use_fedcm_for_prompt: true, // Use FedCM API when available
            itp_support: true, // Intelligent Tracking Prevention support
            ux_mode: 'popup', // Use popup mode instead of iframe
          });

          // Render the Google Sign-In button
          const buttonElement = document.getElementById("google-signin-button");
          if (buttonElement) {
            window.google.accounts.id.renderButton(buttonElement, {
              theme: "outline",
              size: "large",
              width: 250,
              text: "signin_with",
              shape: "rectangular",
              logo_alignment: "left",
            });
          }
        }
      } catch (error) {
        console.error('Error initializing Google Sign-In:', error);
        setError('Error initializing Google Sign-In');
      }
    };

    loadGoogleScript();

    // Cleanup
    return () => {
      const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleGoogleResponse = async (response: any) => {
    setGoogleLoading(true);
    setError("");

    try {
      // Updated endpoint to match your backend route structure
      const backendResponse = await fetch('https://lockinedge-backend-9.onrender.com/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Include credentials for CORS
        body: JSON.stringify({
          token: response.credential,
        }),
      });

      if (!backendResponse.ok) {
        throw new Error(`HTTP error! status: ${backendResponse.status}`);
      }

      const data = await backendResponse.json();

      if (data.success) {
        // Dispatch login action to Redux store
        dispatch(setLogin({
          token: data.data.token,
          user: data.data.user
        }));
        
        // Redirect to homepage
        navigate('/');
      } else {
        setError(data.message || 'Google sign-in failed');
      }
    } catch (err) {
      console.error('Google sign-in error:', err);
      setError('Network error during Google sign-in. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('https://lockinedge-backend-8.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Include credentials for CORS
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
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
      console.error('Login error:', err);
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
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Google Sign-In Button */}
        <div className={`google-signin-container ${googleLoading ? 'loading' : ''}`}>
          <div id="google-signin-button"></div>
          {googleLoading && (
            <div className="google-signin-loading">
              <div className="loading-spinner"></div>
              <span>Signing in with Google...</span>
            </div>
          )}
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
              disabled={loading}
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
              disabled={loading}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
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
              disabled={loading}
            />
            <span className="checkmark"></span>
            Remember me
          </label>
          <Link 
            to="/forgot-password" 
            className="forgot-link"
            tabIndex={loading ? -1 : 0}
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn" disabled={loading || googleLoading}>
          {loading ? (
            <>
              <div className="loading-spinner"></div>
              <span>Signing In...</span>
            </>
          ) : (
            'Sign In'
          )}
        </button>

        {/* Switch to Register */}
        <p className="switch-form">
          Don't have an account? 
          <Link 
            to="/register" 
            className="switch-link"
            tabIndex={loading ? -1 : 0}
          >
            Create one here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;