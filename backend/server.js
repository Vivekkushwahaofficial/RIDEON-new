// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path"); // <--- ✅ ADDED THIS (Required for file paths)

dotenv.config();
const app = express();

// ---------- MIDDLEWARE ----------
app.use(express.json());

// FIX 1: Allow ANY frontend connection
app.use(cors({
    origin: "*", 
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

// ✅ FIX 3: SERVE IMAGES PUBLICLY
// This allows the frontend to access files in your 'image' folder
app.use("/image", express.static(path.join(__dirname, "image")));

// ---------- CONNECT DATABASE ----------
connectDB();

// ---------- ROUTES ----------
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bikes", require("./routes/bikeRoutes"));

// Root Test Route
app.get("/", (req, res) => {
    res.send("RideOn Backend is running successfully 🚀");
});

// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ... existing code ...

// ---------- ROUTES ----------
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bikes", require("./routes/bikeRoutes"));

// ✅ ADD THIS NEW LINE HERE:
app.use("/api/bookings", require("./routes/bookingRoutes"));

// ... existing code ...