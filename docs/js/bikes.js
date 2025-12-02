// frontend/js/bikes.js

// ✅ FIX 1: Point to your Live Render Backend (Not Localhost)
const API_BASE_URL = 'https://rideon-new.onrender.com';
const BIKES_URL = `${API_BASE_URL}/api/bikes`;

document.addEventListener('DOMContentLoaded', () => {
    fetchBikes();
    updateNav();
});

async function fetchBikes() {
    try {
        const response = await fetch(BIKES_URL);
        const bikes = await response.json();
        const container = document.getElementById('bike-container');

        if (container) {
            container.innerHTML = '';
            
            bikes.forEach(bike => {
                // ===============================================
                // 1. LINK LOGIC (Navigation)
                // ===============================================
                const isPagesFolder = window.location.pathname.includes('/pages/');
                
                // If we are inside /pages/, link directly to booking.html
                // If we are at root (index.html), link to pages/booking.html
                const linkPath = isPagesFolder 
                                 ? `booking.html?bikeId=${bike._id}` 
                                 : `pages/booking.html?bikeId=${bike._id}`;

                // ===============================================
                // 2. IMAGE LOGIC (The "404" Fix)
                // ===============================================
                // We must tell the browser: "Get this image from the Render Server"
                // This combines "https://rideon...com" + "/image/bike.jpg"
                const imagePath = `${API_BASE_URL}${bike.image}`;

                const bikeCard = `
                    <div class="bike-card">
                        <img src="${imagePath}" alt="${bike.name}" 
                             style="width:100%; height:200px; object-fit:cover;"
                             onerror="this.src='https://placehold.co/600x400?text=No+Image'">
                        
                        <h3>${bike.name}</h3>
                        <p>Price: ₹${bike.pricePerDay} / Day</p> 
                        
                        <a href="${linkPath}" class="rent-btn" style="
                            display:inline-block; 
                            text-decoration:none; 
                            padding:10px 20px; 
                            background:#D4A373; 
                            color:black; 
                            font-weight:bold; 
                            border-radius:5px;
                            text-align:center;">
                            Book Now
                        </a>
                    </div>
                `;
                container.innerHTML += bikeCard;
            });
        }
    } catch (error) {
        console.error('Error fetching bikes:', error);
    }
}

function updateNav() {
    const token = localStorage.getItem('userToken');
    const loginLink = document.querySelector('.login-btn'); 
    
    if (token && loginLink) {
        loginLink.textContent = "Logout";
        loginLink.removeAttribute('onclick');
        loginLink.addEventListener('click', () => {
            localStorage.removeItem('userToken');
            localStorage.removeItem('userInfo');
            window.location.reload();
        });
    }
}