const express = require("express");
const router = express.Router();
const { getCars, getCar } = require("../controllers/carController");
const { updateCar, addCar } = require("../controllers/adminController");
const { verifyToken } = require("../controllers/authController");
const upload = require("../middleware/upload");

// Public routes
router.get("/", getCars);
router.get("/:id", getCar);

// Allow authenticated POST/PUT for car creation/updates (for admin tools like AI/cURL)
router.post("/", verifyToken, upload.array("images", 10), addCar);
router.put("/:id", verifyToken, upload.array("images", 10), updateCar);

module.exports = router;
