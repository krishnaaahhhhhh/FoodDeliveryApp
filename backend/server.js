const express = require("express");
const app = require("./src/app");
const connectDB = require("./src/db/db.js");

// Connect to MongoDB
connectDB();

// Use the dynamic port assigned by Render
const PORT =  5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
