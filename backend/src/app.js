const express = require('express');
const cors = require("cors");
const app = express();

// Import your food routes
const foodRoutes = require('./routes/food.routes.js');
const authRoutes = require("./routes/auth.routes.js");


// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",  // 👈 must match your frontend port
  credentials: true,                // 👈 allow cookies / withCredentials
}));


// Log a message to see what you're importing for debugging
console.log('Importing foodRoutes in app.js:', foodRoutes);

// Use the food and auth routes
app.use('/api/auth/', authRoutes);
app.use('/api/food', foodRoutes);

// Other routes or middleware would go here...

// Export the app for use in your server.js file
module.exports = app;
