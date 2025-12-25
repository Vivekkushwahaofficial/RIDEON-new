// backend/routes/bikeRoutes.js

const express = require('express');
const router = express.Router();

// Import the Controller functions
// IMPORTANT: These names must match what you exported in bikeController.js
const { 
    getBikes, 
    getBikeById, 
    createBike 
} = require('../controllers/bikeController');

// 1. GET all bikes (This calls your AI Logic)
router.get('/', getBikes);

// 2. GET a single bike by ID
router.get('/:id', getBikeById);

// 3. POST a new bike (This fixes the crash at line 11)
// The error happened because 'createBike' was likely missing or undefined before
router.post('/', createBike);

module.exports = router;