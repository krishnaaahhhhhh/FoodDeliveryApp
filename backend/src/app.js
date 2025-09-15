const express = require("express");
const cors = require("cors");
const path = require("path");

const foodRoutes = require("./routes/food.routes.js");
const authRoutes = require("./routes/auth.routes.js");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // during local dev
    credentials: true,
  })
);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

// ✅ Serve frontend (Vite build)
const frontendPath = path.join(__dirname, "../../Frontend01/dist");
app.use(express.static(frontendPath));

// ✅ Catch-all for SPA (React/Vite)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Export app
module.exports = app;
