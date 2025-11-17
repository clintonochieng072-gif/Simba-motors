const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
console.log("Env loaded:", process.env.CLOUDINARY_API_KEY);
const cloudinary = require("./cloudinary");
const carRoutes = require("./routes/cars");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const settingsRoutes = require("./routes/settings");

const app = express();

// Middleware
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://simba-motors.vercel.app", "https://simba-cars.onrender.com"]
      : [
          "http://localhost:3000",
          "http://127.0.0.1:3000",
          "http://localhost:3001",
          "http://127.0.0.1:3001",
          "http://localhost:5000",
          "http://127.0.0.1:5000",
        ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

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
app.use("/api/settings", express.json(), settingsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
