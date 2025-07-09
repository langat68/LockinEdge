import { useState } from "react";
import "../Styling/AuthForms.scss";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Call your backend API here
    console.log("Register:", { email, password });
  };

  return (
    <form className="auth-form" onSubmit={handleRegister}>
      <h2>Register</h2>
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

      <button type="submit" className="submit-btn">Register</button>
    </form>
  );
};

export default RegisterForm;
