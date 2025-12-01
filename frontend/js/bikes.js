// frontend/js/bikes.js
const BIKES_URL = 'http://localhost:5000/api/bikes';

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
                // 1. LINK LOGIC (The Fix for "Cannot GET")
                // ===============================================
                // We check: Are we already inside the 'pages' folder?
                const isPagesFolder = window.location.pathname.includes('/pages/');
                
                // If we are NOT in pages (like index.html), we must add 'pages/'
                // If we ARE in pages, we just link to 'booking.html'
                const linkPath = isPagesFolder 
                                 ? `booking.html?bikeId=${bike._id}` 
                                 : `pages/booking.html?bikeId=${bike._id}`;

                // ===============================================
                // 2. IMAGE LOGIC (Keeps your images working)
                // ===============================================
                let cleanPath = bike.image.startsWith('/') ? bike.image.substring(1) : bike.image;
                
                // If we are in 'pages', we need to go up one level (../)
                // If we are at root, we might need to go up (../) based on your Blue Box test
                const imagePath = `../${cleanPath}`; 

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