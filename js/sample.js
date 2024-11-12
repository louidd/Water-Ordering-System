const userLogin = sessionStorage.getItem("User");
const singleProd = JSON.parse(localStorage.getItem("userOrder")) || [];  // Load Ordered from localStorage
const Accounts = JSON.parse(localStorage.getItem("created")) || [];
const modal = document.getElementById("myModal");
const modalEdit = document.getElementById("editModal");
const closeView = document.getElementsByClassName("close")[0];
const closeEdit = document.getElementsByClassName("editClose")[0];

    if(!userLogin){
        alert("Please Login First!");
        window.location = "index.html";
    }

    displayOrder()
    historyOrder()

function logout() {
    // Perform logout actions, like clearing session data, redirecting, etc.
    alert("You have been logged out.");
    sessionStorage.removeItem("User");
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
    const listProd = document.getElementById('productSelect').value;
    const quantity1 = document.getElementById('Galon').value;
    const paymentMode = document.getElementById('paymentMode').value;
    const date = new Date().toISOString().split('T')[0];

    if (!listProd || !quantity1 || !paymentMode) {
        alert("Please fill in all fields!");
        return;
    }

    const galPrice = 25;
    const Status = "Pending"
    const markBy = "N/A"

    let singleProduct = {
        UName : userLogin,
        prodName: listProd,
        Galon: galPrice,
        QuantityForGalon: quantity1,
        Date: date,
        Total: galPrice*quantity1,
        MOP: paymentMode,
        Status: Status,
        markAsCompletedBy: markBy
    };

    const pendingOrders = Accounts.findIndex(comp => comp.Username === userLogin);
    const productSelect = document.getElementById("productSelect");
    const galonInput = document.getElementById("Galon");
    const litreInput = document.getElementById("Litre");
    const paymentModeSelect = document.getElementById("paymentMode");


    if(pendingOrders !== -1){
        Accounts[pendingOrders].pendingOrder += 1;
        alert("Place Order Successfully")
        productSelect.selectedIndex = 0;
        paymentModeSelect.selectedIndex = 0;
        galonInput.value = "";
        litreInput.value = "";
    }else{
        console.warn("Account not found for user:", userLogin)
    }

    singleProd.push(singleProduct)
    localStorage.setItem("created", JSON.stringify(Accounts));
    localStorage.setItem("userOrder", JSON.stringify(singleProd));  // Save to localStorage
    displayOrder()
    historyOrder()
}

function loadUsername() {

    // Set the username in the homeContent section
    document.getElementById('customerUsername').textContent = userLogin;
}

// Call this function when the page loads
window.onload = function() {
    loadUsername();
}
//Placed Orders
function displayOrder() {
    const order_content = document.getElementById('order_content');
    const statusOrders = singleProd.filter(order =>order.UName === userLogin && order.Status === "Pending" || order.Status === "Confirmed");
    let template = "";

        for(let i = 0; i < statusOrders.length; i++){
            template += `
                        <tr>
                            <td>${i+1}</td>
                            <td>
                                <button onclick="viewProduct(${i})">View Receipt</button>
                            </td>
                            <td>
                                <button onclick="rcvOrder(${i})" id="rcv">Received</button>
                                <button onclick="changeValue(${i})">Edit</button>
                                <button onclick="canceluserOrder(${i})">Cancel</button>
                            </td>
                            <td>${statusOrders[i].Status}</td>
                        </tr>`
        }
        order_content.innerHTML = template;
}

//Received Button
function rcvOrder(){
    const rcvOrder = singleProd.findIndex(order => order.UName === userLogin && order.Status === "Confirmed");
    const dlvrd = Accounts.findIndex(comp => comp.Username === userLogin);

    singleProd[rcvOrder].Status = "Delivered";
    singleProd[rcvOrder].markAsCompletedBy = userLogin;
    Accounts[dlvrd].completeOrder += 1;

    localStorage.setItem("created", JSON.stringify(Accounts));
    localStorage.setItem("userOrder", JSON.stringify(singleProd));
    displayOrder()
    historyOrder()
}
//Edit button
function changeValue(index){
    let product = singleProd[index];

    document.getElementById("changeProd").value = product.prodName;
    document.getElementById("changeQuant").value = product.QuantityForGalon;
    document.getElementById("changePayment").value = product.MOP;

    modalEdit.style.display = "block";
}
// Cancel button
function canceluserOrder(index) {
    if (confirm("Are you sure you want to cancel this order?")) {
        singleProd.splice(index, 1);  // Remove product from array by original index
        localStorage.setItem("userOrder", JSON.stringify(singleProd));  // Update localStorage
        displayOrder()  // Refresh the display
        historyOrder()
    }
}
//Place Order in Edit Button
function changeOrder (){
    const changeProd = document.getElementById('changeProd').value
    const changeQuant = document.getElementById('changeQuant').value
    const changePayment = document.getElementById('changePayment').value




    displayOrder()
    historyOrder()
}

//History
function historyOrder(){
    const history = document.getElementById('oderHis_content');

    const deliveredOrder = singleProd.filter(order => order.Status === "Delivered");
    let template = "";

    for(let i = 0; i < deliveredOrder.length; i++){
        template += `
                    <tr>
                        <td>${i+1}</td>
                        <td>
                            <button onclick="viewProduct(${i})">View Receipt</button>
                        </td>
                        <td>${deliveredOrder[i].Status}</td>
                    </tr>`
    }
    history.innerHTML = template;
}

function viewProduct(index){
    let product = singleProd[index];  // Get the product by original index
   
    document.getElementById("galName").innerText = product.prodName;
    document.getElementById("galonPrice").innerText = product.Galon;
    document.getElementById("galonQuant").innerText = product.QuantityForGalon;
    document.getElementById("orderDate").innerText = product.Date;
    document.getElementById("orderTotal").innerText = product.Total;
    document.getElementById("orderMOP").innerText = product.MOP;
    modal.style.display = "block";
}

// Modal close functionality
closeView.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if(event.target == modal){
        modal.style.display = "none";
    }
}

// Modal Edit close functionality
closeEdit.onclick = function() {
    modalEdit.style.display = "none";
}

window.onclick = function(event) {
    if(event.target == modalEdit){
        modalEdit.style.display = "none";
    }
}