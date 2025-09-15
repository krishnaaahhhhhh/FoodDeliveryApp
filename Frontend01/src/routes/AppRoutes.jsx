import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin.jsx";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister.jsx";
import UserLogin from "../pages/auth/UserLogin.jsx";
import UserRegister from "../pages/auth/UserRegister.jsx";
import Home from "../pages/general/Home.jsx";
import Profile from "../pages/food-partner/Profile";
import CreateFood from "../pages/food-partner/CreateFood";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route
          path="/food-partner/register"
          element={<FoodPartnerRegister />}
        />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/" element={<Home />} />
        <Route path="/food-partner/:id" element={<Profile />} />
        <Route path="/create-food" element={<CreateFood />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
