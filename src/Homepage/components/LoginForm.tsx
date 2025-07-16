import { useState } from "react";
import "../Styling/AuthForms.scss";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../Redux/slices/authSlice';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        const token = result.data.token;
        const user = result.data.user;

        // Dispatch login action with the real user and token
        dispatch(setLogin({ token, user }));

        console.log("Login successful! Token & user stored in Redux and localStorage.");
        navigate('/');
      } else {
        throw new Error(result.message || 'Login failed');
      }

    } catch (error) {
      console.error("Login failed:", error);
      // Show error message to user here if desired
    }
  };

  return (
    <form className="auth-form" onSubmit={handleLogin}>
      <h2>Login</h2>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="submit-btn">Login</button>

      <p className="switch-form">
        Don't have an account? <a href="/register">Sign up</a>
      </p>
    </form>
  );
};

export default LoginForm;
