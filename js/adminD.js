// Show the corresponding section based on the tab clicked
function showContent(section) {
    const homeSection = document.getElementById('home-section');
    const historySection = document.getElementById('history-section');
    const customerListSection = document.getElementById('customerList-section');
    const pendingOrdersSection = document.getElementById('pendingOrders-section');
    const toBeDeliveredSection = document.getElementById('toBeDelivered-section');
    
    // Hide all sections first
    homeSection.style.display = 'none';
    historySection.style.display = 'none';
    customerListSection.style.display = 'none';
    pendingOrdersSection.style.display = 'none';
    toBeDeliveredSection.style.display = 'none';

    // Show the selected section
    if (section === 'home') {
        homeSection.style.display = 'block';
    } else if (section === 'history') {
        historySection.style.display = 'block';
    }
}

// Show specific details like customer list, pending orders, or to be delivered
function showDetails(detailType) {
    const customerListSection = document.getElementById('customerList-section');
    const pendingOrdersSection = document.getElementById('pendingOrders-section');
    const toBeDeliveredSection = document.getElementById('toBeDelivered-section');
    
    // Hide all details sections
    customerListSection.style.display = 'none';
    pendingOrdersSection.style.display = 'none';
    toBeDeliveredSection.style.display = 'none';
    
    // Show the relevant detail section based on what the user clicked
    if (detailType === 'customerList') {
        customerListSection.style.display = 'block';
    } else if (detailType === 'pendingOrders') {
        pendingOrdersSection.style.display = 'block';
    } else if (detailType === 'toBeDelivered') {
        toBeDeliveredSection.style.display = 'block';
    }
}

function searchCustomer() {
    var input = document.getElementById('searchBar').value.toLowerCase();
    var customers = document.querySelectorAll('.customer');
    customers.forEach(function(customer) {
        if (customer.textContent.toLowerCase().includes(input)) {
            customer.style.display = 'block';
        } else {
            customer.style.display = 'none';
        }
    });
}

function showModal() {
    document.getElementById('orderDetailsModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('orderDetailsModal').style.display = 'none';
}

// Notification close functionality
function closeNotification() {
    document.querySelector('.notification').style.display = 'none';
}


// Logout functionality
function logout() {
    if (confirm("Are you sure you want to logout?")) {
        window.location.href = 'index.html'; // Redirect to login page
    }
}
