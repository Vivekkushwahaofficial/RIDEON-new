// frontend/js/booking.js

const API_URL = "http://localhost:5000/api/bikes"; 

document.addEventListener("DOMContentLoaded", async () => {
    
    // 1. SECURITY CHECK: Are you logged in?
    const token = localStorage.getItem('userToken');
    if (!token) {
        alert("You must be logged in to book a bike!");
        window.location.href = "login.html"; // Kick them out if no token
        return;
    }

    // 2. READ THE URL: Which bike did they click?
    // It looks for ?bikeId=12345 at the end of the link
    const urlParams = new URLSearchParams(window.location.search);
    const bikeId = urlParams.get("bikeId");

    if (!bikeId) {
        // If they came here without clicking a bike, send them home
        alert("No bike selected!");
        window.location.href = "../index.html";
        return;
    }

    // 3. FETCH DETAILS: Get the specific bike info
    try {
        const response = await fetch(API_URL); 
        const bikes = await response.json();
        
        // Find the one bike that matches the ID
        const selectedBike = bikes.find(bike => bike._id === bikeId);

        if (selectedBike) {
            // Fill the HTML boxes with data
            // MAKE SURE your HTML inputs have these exact IDs!
            document.getElementById("bike-name").value = selectedBike.name;
            document.getElementById("bike-price").value = `₹${selectedBike.pricePerDay}`;
            document.getElementById("bike-image").src = selectedBike.image;
        }
    } catch (error) {
        console.error("Error loading bike details:", error);
    }
});

// 4. HANDLE CONFIRM BUTTON
const bookingForm = document.getElementById("booking-form");
if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Booking feature coming soon! (We need to connect this to the backend next)");
    });
}