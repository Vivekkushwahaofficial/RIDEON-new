// frontend/js/bikes.js

const API_BASE_URL = 'https://rideon-new.onrender.com';
const BIKES_URL = `${API_BASE_URL}/api/bikes`;

document.addEventListener('DOMContentLoaded', () => {
    fetchBikes();
    updateNav();
});

async function fetchBikes() {
    try {
        // ===============================================
        // 1. AI CONNECTION UPDATE: GET USER TOKEN
        // ===============================================
        const token = localStorage.getItem('userToken');
        
        // Create headers. If user is logged in, attach their ID card (Token)
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // ===============================================
        // 2. FETCH WITH HEADERS
        // ===============================================
        // We now send the headers so the Backend knows who we are
        const response = await fetch(BIKES_URL, {
            method: 'GET',
            headers: headers
        });

        const bikes = await response.json();
        const container = document.getElementById('bike-container');

        if (container) {
            container.innerHTML = '';
            
            // If the backend sends an empty list or error
            if (bikes.length === 0) {
                container.innerHTML = '<p style="text-align:center;">No bikes available right now.</p>';
                return;
            }

            bikes.forEach(bike => {
                // ===============================================
                // 3. LINK LOGIC (Navigation)
                // ===============================================
                const isPagesFolder = window.location.pathname.includes('/pages/');
                
                // If we are inside /pages/, link directly to booking.html
                // If we are at root (index.html), link to pages/booking.html
                const linkPath = isPagesFolder 
                                 ? `booking.html?bikeId=${bike._id}` 
                                 : `pages/booking.html?bikeId=${bike._id}`;

                // ===============================================
                // 4. IMAGE LOGIC (The "404" Fix)
                // ===============================================
                const imagePath = `${API_BASE_URL}${bike.image}`;

                // Optional: Check if this bike was recommended by AI
                // (Assuming your backend adds a 'relevanceScore' property)
                const aiBadge = bike.relevanceScore > 0 
                    ? `<span style="background:gold; color:black; padding:2px 8px; border-radius:10px; font-size:12px; position:absolute; top:10px; right:10px;">Recommended</span>` 
                    : '';

                const bikeCard = `
                    <div class="bike-card" style="position:relative;">
                        ${aiBadge}
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