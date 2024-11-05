function showAdmin() {
    document.getElementById("adminLogin").style.display = "block";
    document.getElementById("userLogin").style.display = "none"; // Hide user login form
}

function showUser() {
    document.getElementById("userLogin").style.display = "block";
    document.getElementById("adminLogin").style.display = "none"; // Hide admin login form
}

// Array containing admin and user data
const accounts = [
    { username: "admin", password: "123", type: "admin" },
    { username: "otenan", password: "123", type: "user" }
];

// Function to login as admin
function loginAdmin() {
    const username = document.getElementById("admin").value;
    const password = document.getElementById("adminP").value;

    const account = accounts.find(u => u.username === username && u.password === password);

    if (account) {
        // Redirect based on user type
        if (account.type === "admin") {
            window.location.href = "adminD.html";  // Redirect to admin dashboard
        }
    } else {
        // If no user matches, show an error message
        alert("Invalid admin username or password.");
    }

    return false;  // Prevent form submission
}

// Function to login as user
function loginUser() {
    const username = document.getElementById("user").value;
    const password = document.getElementById("userP").value;

    const account = accounts.find(u => u.username === username && u.password === password);

    if (account) {
        // Redirect based on user type
        if (account.type === "user") {
            localStorage.setItem('username', account.username); // Store username in localStorage
            window.location.href = "userD.html";  // Redirect to user dashboard
        }
    } else {
        alert("Invalid username or password.");
    }

    return false;  // Prevent form submission
}
