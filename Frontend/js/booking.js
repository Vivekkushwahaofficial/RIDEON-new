// frontend/js/booking.js

const API_URL = "https://rideon-new.onrender.com/api/bikes"; 
const BASE_URL = "https://rideon-new.onrender.com";

document.addEventListener("DOMContentLoaded", async () => {
    
    // 1. SECURITY CHECK: Are you logged in?
    const token = localStorage.getItem('userToken');
    if (!token) {
        alert("You must be logged in to book a bike!");
        window.location.href = "login.html"; 
        return;
    }

    //  ADDED: Prevent users from selecting past dates
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('start-date').setAttribute('min', today);
    document.getElementById('end-date').setAttribute('min', today);

    // 2. READ THE URL
    const urlParams = new URLSearchParams(window.location.search);
    const bikeId = urlParams.get("bikeId");

    if (!bikeId) {
        alert("No bike selected!");
        window.location.href = "../index.html";
        return;
    }

    // 3. FETCH DETAILS
    try {
        const response = await fetch(API_URL); 
        const bikes = await response.json();
        
        // Find the bike
        const selectedBike = bikes.find(bike => bike._id === bikeId);

        if (selectedBike) {
            // Fill the Form Inputs (Read-only)
            document.getElementById("bike-name").value = selectedBike.name;
            document.getElementById("bike-price").value = `₹${selectedBike.pricePerDay}`;
            document.getElementById("bike-image").src = selectedBike.image;

            //  ADDED: Update the Big Header Text and Price Tag
            // (These correspond to the <h2 id="display-name"> in your HTML)
            document.getElementById("display-name").innerText = selectedBike.name;
            document.getElementById("display-price").innerText = `₹${selectedBike.pricePerDay} / day`;
        }
    } catch (error) {
        console.error("Error loading bike details:", error);
    }
});

// 4. HANDLE CONFIRM BUTTON
const bookingForm = document.getElementById("booking-form");

if (bookingForm) {
    bookingForm.addEventListener("submit", async (e) => {
        e.preventDefault(); 

        // A. Get Data
        const startDate = document.getElementById("start-date").value;
        const endDate = document.getElementById("end-date").value;
        const urlParams = new URLSearchParams(window.location.search);
        const bikeId = urlParams.get("bikeId");
        const token = localStorage.getItem('userToken');

        // B. Validation
        if (!startDate || !endDate) {
            alert("Please select both a Start Date and an End Date.");
            return;
        }

        // C. Send to Backend
        try {
            const response = await fetch(`${BASE_URL}/api/bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify({
                    bikeId: bikeId,
                    startDate: startDate,
                    endDate: endDate
                })
            });

            const data = await response.json();

            // D. Handle Result
            if (response.ok) {
                alert(`✅ Booking Confirmed!\nTotal Price: ₹${data.totalPrice}`);
                window.location.href = "dashboard.html"; 
            } else {
                alert("❌ Booking Failed: " + data.message);
            }

        } catch (error) {
            console.error("Booking Error:", error);
            alert("Server connection failed. Is the backend running?");
        }
    });
}