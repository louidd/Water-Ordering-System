const adminIsLogin = sessionStorage.getItem("Admin");
const createAcc = document.getElementById('submit');
const modal = document.getElementById("myModal");
const notis = document.getElementById('notification');
const span = document.getElementsByClassName("close")[0];
const Accounts = JSON.parse(localStorage.getItem("created")) || [];  // Load Accounts from localStorage
const singleProd = JSON.parse(localStorage.getItem("userOrder")) || [];  // Load Ordered from localStorage
const confirmed = JSON.parse(localStorage.getItem("confirmOrder")) || [];  // Load Ordered from localStorage

if(!adminIsLogin){
    alert("Please Login First!");
    window.location = "index.html";
}

displayAccount()
displayOrder()
historyOrder()
displayTBD()
notif()

createAcc.addEventListener("click", function(){
    const user = document.getElementById('uname').value
    const pass = document.getElementById('pass').value
    const cname = document.getElementById('cname').value
    const address = document.getElementById('address').value
    const contact = document.getElementById('contact').value
    const email = document.getElementById('email').value
    const landM = document.getElementById('landM').value

    const pendingOrder = 0;
    const completed = 0;

    const create = {
        Username : user,
        Password : pass,
        Name : cname,
        Address: address,
        Number: contact,
        Email: email,
        LMark: landM,
        pendingOrder : pendingOrder,
        completeOrder : completed,
    };

    Accounts.push(create);  // Add new product
    localStorage.setItem("created", JSON.stringify(Accounts));  // Save to localStorage

    displayAccount()
    historyOrder()
    displayOrder()
    displayTBD()
    notif()

})

//Display Account
function displayAccount(filteredProducts = Accounts){
    const account_content = document.getElementById('account_content');
    const paginatedProducts = filteredProducts.slice(); // Get the products for the current page
    let disAccounts = "";

        for(let i = 0; i < paginatedProducts.length; i++){
            disAccounts += `
                        <tr>
                            <td>${paginatedProducts[i].Username}</td>
                            <td>${paginatedProducts[i].Password}</td>
                            <td>${paginatedProducts[i].Name}</td>
                            <td>${paginatedProducts[i].Address}</td>
                            <td>${paginatedProducts[i].Number}</td>
                            <td>${paginatedProducts[i].Email}</td>
                            <td>${paginatedProducts[i].completeOrder}</td>
                        </tr>`
        }
        account_content.innerHTML = disAccounts;
}

//Display Order in Pending Orders
function displayOrder() {
    const order_content = document.getElementById('order_content');
    const pendingOrders = singleProd.filter(order => order.UName && order.Status === "Pending");
    
    let template = "";
        
        for(let i = 0; i < pendingOrders.length; i++){
            template += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${pendingOrders[i].UName}</td>
                            <td>
                                <button onclick="viewProduct(${i})">View Receipt</button>
                            </td>
                            <td>${pendingOrders[i].Status}</td>
                        </tr>`
        }
        
        order_content.innerHTML = template;
}

//To be Delivered
function displayTBD(){
    
    const delivering = document.getElementById("delivering");

    const tbDelivered = singleProd.filter(order => order.Status === "Confirmed");

    let list = "";

        for(let i = 0; i < tbDelivered.length; i++){
            list += `
            <li>Order #${i + 1} for Customer ${tbDelivered[i].UName} <button onclick="DlvSuccess(${i})">Delivered<button/></li>`
        }
        delivering.innerHTML = list;
}

//History
function historyOrder(){
    const history = document.getElementById('history_content');
    const deliveredOrder = singleProd.filter(order => order.Status === "Delivered");

    let template = "";

    for(let i = 0; i < deliveredOrder.length; i++){
        template += `
                    <li>Order #${i + 1} was marked completed by ${deliveredOrder[i].markAsCompletedBy}.</li>`
    }

    history.innerHTML = template;
}

//Notification
function notif(){
    const notif = document.getElementById('notif');


    const notisOrder = Accounts.reduce((sum, user) => sum + (user.pendingOrder), 0)
    let template = "";

    if(notisOrder){
        notis.style.display = "block"
        template += `${notisOrder}`
    }else{
        notis.style.display = "none"
    }

    notif.textContent = template;
    
}

//View Order Details
function viewProduct(index){
    let product = singleProd[index];  // Get the product by original index

    if(!product){
        console.error("Product not found for index:", index)
    }
    document.getElementById("bothName").innerText = product.Name;
    document.getElementById("cUser").innerText = product.UName;
    document.getElementById("galonPrice").innerText = product.Galon;
    document.getElementById("galonQuant").innerText = product.QuantityForGalon;
    document.getElementById("orderDate").innerText = product.Date;
    document.getElementById("orderTotal").innerText = product.Total;
    document.getElementById("orderMOP").innerText = product.MOP;
    modal.style.display = "block";
}

// Modal close functionality for single product
span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if(event.target == modal){
        modal.style.display = "none";
    }
}

//Change Status Pending to Confirmed
function tbDeliver(){
    const UOrder = document.getElementById("cUser").innerText;
    const orderIndex = singleProd.findIndex(order => order.UName === UOrder && order.Status === "Pending");
    const toConfOrder = Accounts.findIndex(order => order.Username === UOrder)
    //from Pending to Confirmed
    singleProd[orderIndex].Status = "Confirmed";
    Accounts[toConfOrder].pendingOrder -= 1;

    localStorage.setItem("created", JSON.stringify(Accounts));
    localStorage.setItem("userOrder", JSON.stringify(singleProd));
    modal.style.display = "none";

    displayAccount()
    historyOrder()
    displayOrder()
    displayTBD()
    notif()
}

//Change Status Pending to Cancelled
function cDeliver(){
    const UOrder = document.getElementById("cUser").innerText;
    const orderIndex = singleProd.findIndex(order => order.UName === UOrder && order.Status === "Pending");

    singleProd[orderIndex].Status = "Cancelled";
    
    localStorage.setItem("userOrder", JSON.stringify(singleProd));
    modal.style.display = "none";

    displayAccount()
    historyOrder()
    displayOrder()
    displayTBD()
    notif()
}


//Delivered Button
function DlvSuccess(index){
    const tbDelivered = singleProd.filter(order => order.Status === "Confirmed")
    const UOrder = tbDelivered[index].UName //Get the username from the confirmed order
    const delivered = singleProd.findIndex(order => order === tbDelivered[index]);
    const comple = Accounts.findIndex(comp => comp.Username === UOrder);

    const targetOrer = tbDelivered[index]; //Find the order in localstorage
    const deliveredList = singleProd.findIndex(order => order === targetOrer) //Find the account of the user placing to order

    if(deliveredList === -1){
        alert(`Order not found
                view console to check error`)
        
    }

    singleProd[delivered].Status = "Delivered";
    singleProd[delivered].markAsCompletedBy = adminIsLogin;
    Accounts[comple].completeOrder += 1;

    localStorage.setItem("created", JSON.stringify(Accounts));
    localStorage.setItem("userOrder", JSON.stringify(singleProd));

    displayAccount()
    historyOrder()
    displayOrder()
    displayTBD()
    notif()
}

//Search for costumer
const search = document.getElementById('searchBar')
search.addEventListener("input", function (e){
    let searchTerm = e.target.value.toLowerCase().trim();  // Use .trim() to remove accidental spaces
    searchData(searchTerm);  // Call searchData when the input changes
})
// Function to search and display products
function searchData(searchTerm) {
    const filteredProducts = Accounts.filter(uName => 
        uName.Username.toLowerCase().includes(searchTerm)
    );

    displayAccount(filteredProducts);
}

// Show the corresponding section based on the tab clicked
function showContent(section) {
    const homeSection = document.getElementById('home-section');
    const historySection = document.getElementById('history-section');
    const registerSection = document.getElementById('register-section')
    const customerListSection = document.getElementById('customerList-section');
    const pendingOrdersSection = document.getElementById('pendingOrders-section');
    const toBeDeliveredSection = document.getElementById('toBeDelivered-section');
    
    // Hide all sections first
    homeSection.style.display = 'none';
    historySection.style.display = 'none';
    registerSection.style.display = 'none';
    customerListSection.style.display = 'none';
    pendingOrdersSection.style.display = 'none';
    toBeDeliveredSection.style.display = 'none';

    // Show the selected section
    if (section === 'home') {
        homeSection.style.display = 'block';
    } else if (section === 'history') {
        historySection.style.display = 'block';
    } else if (section === 'register') {
        registerSection.style.display = 'block';
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
        sessionStorage.removeItem("Admin");
        window.location.href = 'index.html'; // Redirect to login page
    }
}

function toggleDropdown() {
    const profileMenu = document.getElementById('profileMenu');
    profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
}

// Close dropdown menu if clicked outside
document.addEventListener('click', function(event) {
    const profileMenu = document.getElementById('profileMenu');
    const profileIcon = document.querySelector('.profile-icon');

    if (!profileMenu.contains(event.target) && !profileIcon.contains(event.target)) {
        profileMenu.style.display = 'none';
    }
});
