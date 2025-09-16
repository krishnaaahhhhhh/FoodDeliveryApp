const express = require("express");
const app = require("./src/app");
const connectDB = require("./src/db/db.js");

// Connect to MongoDB
connectDB();

// Use dynamic port for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
