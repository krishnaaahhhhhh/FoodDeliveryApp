import React from "react";
import "../../styles/auth-shared.css";
import api from "../../utils/api"; // ✅ use central axios instance
import { useNavigate } from "react-router-dom";

export const UserRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await api.post("/auth/user/register", {
        fullName,
        email,
        password,
      });

      console.log("Registration success:", response.data);
      navigate("/user/login"); // Redirect after registration
    } catch (error) {
      console.error("Registration failed:", error.message);
      alert("Registration failed! Check console for details.");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div
        className="auth-card"
        role="region"
        aria-labelledby="user-register-title"
      >
        <header>
          <h1 id="user-register-title" className="auth-title">
            Create account
          </h1>
          <p className="auth-subtitle">Join the food journey today.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
            />
          </div>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>
          <button className="auth-submit" type="submit">
            Register
          </button>
        </form>
        <div className="auth-alt-action">
          Already have an account? <a href="/user/login">Sign in</a>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
