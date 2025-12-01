// backend/models/bikeModel.js
const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  image: { type: String }, // relative path or URL
  available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Bike", bikeSchema);
