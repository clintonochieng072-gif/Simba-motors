const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Admin login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for email:", email);

    // Check if admin exists in database
    const admin = await Admin.findOne({ email });
    console.log("Admin found:", !!admin);
    if (!admin) {
      console.log("No admin found with email:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    console.log("Password comparison result:", isValidPassword);
    if (!isValidPassword) {
      console.log("Password mismatch for admin:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("JWT_SECRET available:", !!process.env.JWT_SECRET);
    const token = jwt.sign(
      { email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    console.log("Login successful for:", email);
    res
      .status(200)
      .json({ token, user: { email: admin.email, role: admin.role } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Verify token middleware (will be used in routes)
exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
