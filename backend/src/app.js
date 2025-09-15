const express = require('express');
const cors = require("cors");
const path = require("path"); // 🔹 add this
const app = express();

// Import your routes
const foodRoutes = require('./routes/food.routes.js');
const authRoutes = require("./routes/auth.routes.js");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",  // 👈 during local dev
  credentials: true,
}));

// Routes
app.use('/api/auth/', authRoutes);
app.use('/api/food', foodRoutes);

// 🔹 Serve Vite frontend build
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

// Export app
module.exports = app;
