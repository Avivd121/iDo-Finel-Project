import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    // navigate("/");  נווט לעמוד הבית
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Route to register
  };

  return (
    <div className="login-background">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="login-title">Login</h1>

        <div className="form-group">
          <label>User name</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>

        {/* Register button */}
        <p className="register-link">
          Not registered?{" "}
          <span onClick={handleRegisterClick} className="register-anchor">
            Click here to register!
          </span>
        </p>
      </form>
    </div>
  );
}
