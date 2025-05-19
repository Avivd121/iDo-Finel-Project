import React, { useState } from "react";
import "./register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="main">
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name..."
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter a username..."
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label>Email address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address..."
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Enter your password again..."
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="register-button">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
