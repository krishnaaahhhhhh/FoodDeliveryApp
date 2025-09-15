
const express = require("express");

const app = require("./src/app");
const connectDB = require("./src/db/db.js");
connectDB();
const PORT =5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
