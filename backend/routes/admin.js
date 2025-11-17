const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/authController");
const {
  getDashboardStats,
  getAllCars,
  addCar,
  updateCar,
  deleteCar,
} = require("../controllers/adminController");
const upload = require("../middleware/upload");

// Protected admin routes
router.use(verifyToken);

router.get("/dashboard", getDashboardStats);
router.get("/cars", getAllCars);
router.post("/cars", upload.any(), addCar);
router.put("/cars/:id", upload.any(), updateCar);
router.patch("/cars/:id", updateCar);
router.delete("/cars/:id", deleteCar);

module.exports = router;
