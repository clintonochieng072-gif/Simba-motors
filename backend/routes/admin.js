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
router.post("/cars", upload.array("images", 10), addCar);
router.put("/cars/:id", upload.array("images", 10), updateCar);
router.delete("/cars/:id", deleteCar);

module.exports = router;
