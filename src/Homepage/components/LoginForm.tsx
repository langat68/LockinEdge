import { useState } from "react";
import "../Styling/AuthForms.scss";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Call your backend API here
    console.log("Login:", { email, password });
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
    </form>
  );
};

export default LoginForm;
