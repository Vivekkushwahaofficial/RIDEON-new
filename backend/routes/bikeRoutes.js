// backend/routes/bikeRoutes.js
const express = require("express");
const router = express.Router();
const { getBikes, addBike } = require("../controllers/bikeController");
const auth = require("../middleware/authMiddleware");

// Public: get bikes
router.get("/", getBikes);

// Protected: add bike (you can later restrict to admin)
router.post("/add", auth, addBike);

module.exports = router;
