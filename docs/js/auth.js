// frontend/js/auth.js
const API_URL = "https://rideon-new.onrender.com/api/users";

// LOGIN LOGIC
const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        console.log("Login Button Clicked!");

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
                localStorage.setItem("userToken", data.token);
                localStorage.setItem("userInfo", JSON.stringify(data.user));
                
                alert("Login Successful!");
                closeLogin();
                window.location.reload();
            } else {
                alert(data.message || "Invalid Email or Password");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Backend not responding!");
        }
    });
}

// SIGNUP LOGIC
const signupForm = document.getElementById("signup-form");

if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

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
                closeSignup();
                openLogin();
            } else {
                alert(data.message || "Registration Failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
}
