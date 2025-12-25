// backend/controllers/bikeController.js

const Bike = require('../models/bikeModel');
const Booking = require('../models/bookingModel');
const recommendBikes = require('../utils/recommendationEngine');

// 1. Get All Bikes (With AI Recommendation)
const getBikes = async (req, res) => {
  try {
    const allBikes = await Bike.find({});

    // Check if user is logged in (req.user comes from authMiddleware)
    // Note: The middleware must run before this controller for req.user to exist
    if (req.user && req.user._id) {
        console.log(`Generating recommendations for user: ${req.user._id}`);
        
        // Fetch previous bookings for this user
        const userHistory = await Booking.find({ user: req.user._id }).populate('bikeId');

        // CONNECT THE AI ENGINE
        const sortedBikes = recommendBikes(userHistory, allBikes);
        
        return res.json(sortedBikes);
    }

    // If no user is logged in, just send the normal list
    res.json(allBikes);

  } catch (error) {
    console.error("Error fetching bikes:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// 2. Get Single Bike (Required for Booking Page)
const getBikeById = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (bike) {
      res.json(bike);
    } else {
      res.status(404).json({ message: 'Bike not found' });
    }
  } catch (error) {
    console.error("Error fetching single bike:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// 3. Create a Bike (Admin only - keeping this just in case you use it)
const createBike = async (req, res) => {
    // ... logic for creating bike ...
    res.status(201).json({ message: "Bike created (placeholder)" });
};


// ============================================================
// ✅ CRITICAL FIX: EXPORT THE FUNCTIONS
// ============================================================
module.exports = {
    getBikes,
    getBikeById,
    createBike
};