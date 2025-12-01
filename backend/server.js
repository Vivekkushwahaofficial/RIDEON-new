// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

// ---------- MIDDLEWARE ----------
app.use(express.json());

// FIX 1: Allow ANY frontend connection (Easiest for development)
// This prevents the "localhost" vs "127.0.0.1" error
app.use(cors({
    origin: "*", 
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

// ---------- CONNECT DATABASE ----------
connectDB();

// ---------- ROUTES ----------
// FIX 2: Changed from "/api/auth" to "/api/users" to match your frontend code!
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bikes", require("./routes/bikeRoutes"));
// app.use("/api/bookings", require("./routes/bookingRoutes")); // Added this for later

// Root Test Route
app.get("/", (req, res) => {
    res.send("RideOn Backend is running successfully 🚀");
});

// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));