// backend/seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Bike = require("./models/bikeModel");

const bikes = [
  // ✅ FIX: All paths now start with "/image/" (No ".." and no spaces)
  { name: "R15 V5", pricePerDay: 1200, image: "/image/r15-v5.jpeg" },
  { name: "KTM Duke", pricePerDay: 1200, image: "/image/ktm-duke.jpeg" },
  { name: "MT 15", pricePerDay: 1000, image: "/image/mt-15.jpeg" },
  { name: "Classic 350", pricePerDay: 1200, image: "/image/classic-350.jpeg" },
  { name: "Splendor Plus", pricePerDay: 700, image: "/image/splendor-plus.jpeg" },
  { name: "Glamour", pricePerDay: 800, image: "/image/glamour.jpeg" },
  { name: "Honda Shine", pricePerDay: 800, image: "/image/shine.jpeg" },
  { name: "Royal Enfield Hunter", pricePerDay: 1000, image: "/image/hunter.jpeg" },
  { name: "Honda Activa", pricePerDay: 600, image: "/image/honda-activa.jpeg" },
  { name: "Jupiter", pricePerDay: 600, image: "/image/jupiter.jpeg" },
  { name: "TVS Pulsar", pricePerDay: 500, image: "/image/pulsar-150.jpeg" },
  { name: "Ola Electric S1", pricePerDay: 500, image: "/image/ola-electric.jpeg" }
];

const seed = async () => {
  try {
    const db = process.env.MONGO_URI;
    if (!db) throw new Error("MONGO_URI not found in .env file");

    await mongoose.connect(db);
    console.log("✅ MongoDB Connected!");

    await Bike.deleteMany({});
    console.log("🗑️  Old bikes removed");

    await Bike.insertMany(bikes);
    console.log("🌱 New bikes seeded successfully!");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
};

seed();