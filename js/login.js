const adminIsLogin = sessionStorage.getItem("Admin");
const userIsLogin = sessionStorage.getItem("User");
const Accounts = JSON.parse(localStorage.getItem("created")) || [];  // Load Account from localStorage

function showAdmin() {
    document.getElementById("adminLogin").style.display = "block";
    document.getElementById("userLogin").style.display = "none"; // Hide user login form
}

function showUser() {
    document.getElementById("userLogin").style.display = "block";
    document.getElementById("adminLogin").style.display = "none"; // Hide admin login form
}

// Array containing admin
const accounts = [
    { username: "admin", password: "123", type: "admin" },
];

accounts.push()

//Session data for Admin
if(adminIsLogin){
    alert("Please Logout First!")
    window.location = "adminD.html";
}

//Session data for User
if(userIsLogin){
    alert("Please Logout First!")
    window.location = "sample.html";
}

// Function to login as admin
function loginAdmin() {
    const username = document.getElementById("admin").value;
    const password = document.getElementById("adminP").value;
    
    const account = accounts.find(u => u.username === username && u.password === password);

    if (account) {
        // Redirect based on user type
        if (account.type === "admin") {
            sessionStorage.setItem("Admin", username)
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

    const cUsername = document.getElementById("user").value;
    const cPassword = document.getElementById("userP").value;

    const account = Accounts.find(u => u.Username === cUsername && u.Password === cPassword);

    if(account){
        
        sessionStorage.setItem("User", cUsername)
        window.location.href = "sample.html";  // Redirect to user dashboard
    }else{
            alert("Invalid username or password.");
    }
    
    return false;  // Prevent form submission
}
