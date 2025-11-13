const express = require("express");
const router = express.Router();
const { getCars, getCar } = require("../controllers/carController");

// Public routes
router.get("/", getCars);
router.get("/:id", getCar);

module.exports = router;
