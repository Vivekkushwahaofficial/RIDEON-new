/* ============================================================
   POPUP HANDLING
============================================================ */

// Open Login Popup
function openLogin() {
    document.getElementById("loginPopup").style.display = "flex";
    document.getElementById("signupPopup").style.display = "none";
}

// Close Login Popup
function closeLogin() {
    document.getElementById("loginPopup").style.display = "none";
}

// Open Signup Popup
function openSignup() {
    document.getElementById("signupPopup").style.display = "flex";
    document.getElementById("loginPopup").style.display = "none";
}

// Close Signup Popup
function closeSignup() {
    document.getElementById("signupPopup").style.display = "none";
}

// Close popup when clicking outside content
window.addEventListener("click", function (e) {
    if (e.target.classList.contains("popup")) {
        e.target.style.display = "none";
    }
});


/* ============================================================
   USER REGISTRATION (localStorage)
============================================================ */
function registerUser() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const cpassword = document.getElementById("cpassword").value;

    if (!name || !email || !phone || !password || !cpassword) {
        alert("All fields are required!");
        return;
    }

    if (password !== cpassword) {
        alert("Passwords do not match!");
        return;
    }

    if (localStorage.getItem(email)) {
        alert("Account already exists!");
        return;
    }

    const userData = { name, email, phone, password };
    localStorage.setItem(email, JSON.stringify(userData));

    alert("Account Created Successfully!");

    // Clear form
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("password").value = "";
    document.getElementById("cpassword").value = "";

    openLogin();
}


/* ============================================================
   USER LOGIN
============================================================ */
function loginUser() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Please enter both email and password!");
        return;
    }

    const storedUser = localStorage.getItem(email);
    if (!storedUser) {
        alert("User does not exist!");
        return;
    }

    const userObj = JSON.parse(storedUser);

    if (userObj.password !== password) {
        alert("Incorrect password!");
        return;
    }

    alert(`Welcome back, ${userObj.name}!`);

    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";

    closeLogin();
}


/* ============================================================
   MOBILE NAVBAR TOGGLE
============================================================ */
function toggleMenu() {
    document.getElementById("navMenu").classList.toggle("active");
}


/* ============================================================
   AUTO CLOSE MOBILE MENU ON LINK CLICK + RENT REQUIRE LOGIN
============================================================ */
document.addEventListener("DOMContentLoaded", function () {

    // Close mobile menu when clicking any menu link
    document.querySelectorAll("#navMenu a").forEach(link => {
        link.addEventListener("click", () => {
            const nav = document.getElementById("navMenu");
            if (nav.classList.contains("active")) {
                nav.classList.remove("active");
            }
        });
    });

    // Show login popup if rent button is clicked without login
    document.querySelectorAll(".rent-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            alert("Login required to rent a bike!");
            openLogin();
        });
    });

});
