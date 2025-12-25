const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); 
const Booking = require('../models/bookingModel'); // ✅ Matches your existing file
const Bike = require('../models/bikeModel'); // ⚠️ CHECK THIS: Make sure this matches your Bike model filename

// Middleware: Check if user is logged in
const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            console.error("Token Verification Failed:", error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// POST /api/bookings
router.post('/', protect, async (req, res) => {
    try {
        const { bikeId, startDate, endDate } = req.body;

        // 1. Basic Validation
        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Please select start and end dates' });
        }

        // 2. Find the Bike (to get the price)
        const bike = await Bike.findById(bikeId);
        if (!bike) {
            return res.status(404).json({ message: 'Bike not found' });
        }

        // 3. Calculate Total Price (Required by your Schema)
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = end.getTime() - start.getTime();
        const daysDiff = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days

        if (daysDiff < 0) {
            return res.status(400).json({ message: 'End date cannot be before start date' });
        }

        // If booking is same-day, charge for 1 day minimum, otherwise use exact days
        const billableDays = daysDiff === 0 ? 1 : daysDiff;
        
        // ⚠️ Ensure your Bike model has 'pricePerDay' or 'price'
        const price = bike.pricePerDay || bike.price || 500; // Fallback to 500 if undefined
        const totalAmount = billableDays * price;

        // 4. Save to Database
        const newBooking = await Booking.create({
            user: req.user.id, // ID from the token
            bikeId: bikeId,
            startDate,
            endDate,
            totalPrice: totalAmount, // ✅ Solves the 'required' error
            status: 'booked'
        });

        res.status(201).json({ 
            message: 'Booking Confirmed!', 
            bookingId: newBooking._id,
            totalPrice: totalAmount
        });

    } catch (error) {
        console.error("Booking Error:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;