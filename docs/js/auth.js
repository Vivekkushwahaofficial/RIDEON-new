// frontend/js/auth.js
const API_URL = "http://localhost:5000/api/users"; 

// LOGIN LOGIC
const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Stop page reload

        console.log("Login Button Clicked!"); // Debugging log

        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("Server response:", data);

            if (data.success) {
                // Save Token
                localStorage.setItem("userToken", data.token);
                localStorage.setItem("userInfo", JSON.stringify(data.user));
                
                alert("Login Successful!");
                closeLogin(); // Close popup
                window.location.reload(); // Refresh to update Navbar
            } else {
                alert(data.message || "Invalid Email or Password");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server connection failed. Is Backend running?");
        }
    });
}

// ... (Keep your Signup logic below) ...
// SIGNUP LOGIC
const signupForm = document.getElementById("signup-form");
if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        // precise IDs to avoid conflict
        const name = document.getElementById("signup-name").value;
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        const phone = document.getElementById("signup-phone").value;

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, phone }),
            });
            const data = await response.json();
            
            if (data.success) {
                alert("Registration Successful! Please Login.");
                closeSignup(); // Close the popup
                openLogin();   // Open login popup
            } else {
                alert(data.message || "Registration Failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
}