import React from "react";
import { Link } from "react-router-dom";
import "../../styles/auth-shared.css";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    try {
      const response = await api.post("/auth/food-partner/login", {
        email,
        password,
      });
      console.log("Login success:", response.data);
      navigate("/create-food");
    } catch (error) {
      console.error("Partner login failed!", error);
      alert("Invalid credentials or server error");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div
        className="auth-card"
        role="region"
        aria-labelledby="partner-login-title"
      >
        <header>
          <h1 id="partner-login-title" className="auth-title">
            Partner Sign In
          </h1>
          <p className="auth-subtitle">Welcome back, partner!</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="business@example.com"
              required
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
              required
              autoComplete="current-password"
            />
          </div>
          <button className="auth-submit" type="submit">
            Sign In
          </button>
        </form>
        <div className="auth-alt-action">
          New partner? <Link to="/food-partner/register">Create account</Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
