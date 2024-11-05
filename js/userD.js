function logout() {
    // Perform logout actions, like clearing session data, redirecting, etc.
    alert("You have been logged out.");
    window.location.href = "index.html"; // Redirect to login page or another desired location
}

function showContent(contentId) {
    // Hide all content
    var contents = document.getElementsByClassName('content');
    for (var i = 0; i < contents.length; i++) {
        contents[i].classList.remove('active');
    }

    // Show the selected content based on the ID
    if (contentId === 'orderNow') {
        document.getElementById('orderNowContent').classList.add('active');
    } else if (contentId === 'placedOrders') {
        document.getElementById('placedOrdersContent').classList.add('active');
    } else if (contentId === 'history') {
        document.getElementById('historyContent').classList.add('active');
    } else {
        // Default to showing home content if none is selected
        document.getElementById('homeContent').classList.add('active');
    }
}   

function placeOrder() {
    const product = document.getElementById('productSelect').value;
    const quantity1 = document.getElementById('Galon').value;
    const quantity2 = document.getElementById('Litre').value;
    const paymentMode = document.getElementById('paymentMode').value;

    if (!product || !quantity1 && !quantity2 || !paymentMode) {
        alert("Please fill in all fields!");
        return;
    }

    // Here you can add logic to handle the order placement, like sending data to a server.
    alert(`Order placed for ${product}:\nGalon: ${quantity1}\nLitre: ${quantity2}\nPayment Mode: ${paymentMode}`);
}

function loadUsername() {
    // Get the username from localStorage
    const username = localStorage.getItem('username') || 'Guest'; // Default to 'Guest' if no username found

    // Set the username in the homeContent section
    document.getElementById('customerUsername').textContent = username;
}

// Call this function when the page loads
window.onload = function() {
    loadUsername();
}
