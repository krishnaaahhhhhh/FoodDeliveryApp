const express = require("express");
const cors = require("cors");
const path = require("path");

const foodRoutes = require("./routes/food.routes.js");
const authRoutes = require("./routes/auth.routes.js");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173", // for local dev
      "https://krishnassfooddeliveryapp.onrender.com", // deployed frontend
    ],
    credentials: true,
  })
);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

// ✅ Serve frontend (Vite build)
const frontendPath = path.join(__dirname, "../../Frontend01/dist");
app.use(express.static(frontendPath));

// ✅ Catch-all for SPA
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

module.exports = app;
