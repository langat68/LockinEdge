import { useState, useEffect } from "react";
import "../Styling/AuthForms.scss";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../Redux/slices/authSlice';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

// Google Sign-In types
declare global {
  interface Window {
    google: any;
  }
}

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Google Client ID - Make sure this is correct for your domain
  const GOOGLE_CLIENT_ID = '802590327760-0nt29rm0d3rttv4j6eh8atb9kvoqeifg.apps.googleusercontent.com';

  // Auto-focus email input on component mount
  useEffect(() => {
    const emailInput = document.getElementById('email');
    if (emailInput) {
      emailInput.focus();
    }
  }, []);

  // Handle Google credential response
  const handleGoogleResponse = async (response: any) => {
    setIsGoogleLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!response.credential) {
        throw new Error('No credential received from Google');
      }

      const googleResponse = await fetch('https://lockinedge-backend-8.onrender.com/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: response.credential
        }),
      });

      const result = await googleResponse.json();

      if (!googleResponse.ok) {
        throw new Error(result.message || `HTTP error! status: ${googleResponse.status}`);
      }

      if (result.success) {
        const token = result.data.token;
        const user = result.data.user;

        // Dispatch login action
        dispatch(setLogin({ token, user }));

        setSuccess("Google sign-in successful! Redirecting...");
        
        // Delay navigation for better UX
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        throw new Error(result.message || 'Google authentication failed');
      }

    } catch (error) {
      console.error("Google sign-in failed:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Google sign-in failed. Please try again.");
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Load Google Sign-In script
  useEffect(() => {
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
      document.head.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        const buttonContainer = document.getElementById('google-signin-button');
        if (buttonContainer) {
          window.google.accounts.id.renderButton(
            buttonContainer,
            {
              theme: 'outline',
              size: 'large',
              text: 'signin_with',
              width: 350,
              logo_alignment: 'left',
            }
          );
        }
      }
    };

    loadGoogleScript();
  }, []);

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  // Password validation
  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  // Real-time validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value && emailError) {
      validateEmail(value);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value && passwordError) {
      validatePassword(value);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous messages
    setError("");
    setSuccess("");
    
    // Validate form
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://lockinedge-backend-8.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      if (result.success) {
        const token = result.data.token;
        const user = result.data.user;

        // Dispatch login action with the real user and token
        dispatch(setLogin({ token, user }));

        setSuccess("Login successful! Redirecting...");
        
        // Delay navigation for better UX
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        throw new Error(result.message || 'Login failed');
      }

    } catch (error) {
      console.error("Login failed:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin} noValidate>
        <div className="form-header">
          <h2>Welcome Back</h2>
          <p className="form-subtitle">Sign in to your account</p>
        </div>

        {/* Global Error Message */}
        {error && (
          <div className="message error-message" role="alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="message success-message" role="alert">
            <CheckCircle size={16} />
            <span>{success}</span>
          </div>
        )}

        {/* Google Sign-In Button */}
        <div className="google-signin-container" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div id="google-signin-button" className={isGoogleLoading ? 'loading' : ''}></div>
          {isGoogleLoading && (
            <div className="google-loading-overlay">
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
              onChange={handleEmailChange}
              onBlur={() => validateEmail(email)}
              className={emailError ? 'error' : ''}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? 'email-error' : undefined}
              disabled={isLoading || isGoogleLoading}
            />
          </div>
          {emailError && (
            <span id="email-error" className="field-error" role="alert">
              {emailError}
            </span>
          )}
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
              onChange={handlePasswordChange}
              onBlur={() => validatePassword(password)}
              className={passwordError ? 'error' : ''}
              aria-invalid={!!passwordError}
              aria-describedby={passwordError ? 'password-error' : undefined}
              disabled={isLoading || isGoogleLoading}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={isLoading || isGoogleLoading}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {passwordError && (
            <span id="password-error" className="field-error" role="alert">
              {passwordError}
            </span>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="form-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading || isGoogleLoading}
            />
            <span className="checkmark"></span>
            Remember me
          </label>
          <Link to="/forgot-password" className="forgot-link">
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="submit-btn" 
          disabled={isLoading || isGoogleLoading || !!emailError || !!passwordError}
          aria-describedby={isLoading ? 'loading-status' : undefined}
        >
          {isLoading ? (
            <>
              <div className="loading-spinner"></div>
              <span id="loading-status">Signing in...</span>
            </>
          ) : (
            "Sign In"
          )}
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