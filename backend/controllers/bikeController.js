// backend/controllers/bikeController.js
const Bike = require("../models/bikeModel");

// Get all bikes
exports.getBikes = async (req, res) => {
  try {
    const bikes = await Bike.find().sort({ createdAt: -1 });
    return res.json(bikes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Add a bike (protected can be used by admin)
exports.addBike = async (req, res) => {
  try {
    const { name, pricePerDay, image } = req.body;
    if (!name || !pricePerDay) {
      return res.status(400).json({ message: "Name and price required" });
    }
    const bike = await Bike.create({ name, pricePerDay, image });
    return res.status(201).json({ message: "Bike added", bike });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
