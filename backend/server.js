const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '.env') });
console.log("Env loaded:", process.env.CLOUDINARY_API_KEY);
const cloudinary = require("./cloudinary");
const carRoutes = require("./routes/cars");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");


const app = express();

// Middleware
app.use(cors());

// MongoDB connection
const mongoUri = process.env.MONGO_URI
  ? process.env.MONGO_URI.replace(/"/g, "")
  : "mongodb://localhost:27017/simba_motors";
mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/cars", carRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", express.json(), authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
