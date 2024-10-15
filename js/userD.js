const orders_content = document.getElementById('orders_content');
const myModal = document.getElementById("myModal");
const close = document.getElementsByClassName("close")[0];
let editIndex = null;

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


let products = JSON.parse(localStorage.getItem("Data")) || [];  // Load products from localStorage

function placeOrder() {
    const product = document.getElementById('productSelect').value;
    const paymentMode = document.getElementById('paymentMode').value;
    const quantity1 = document.getElementById('quantity1').value;
    const quantity2 = document.getElementById('quantity2').value;
    let total;
    const galon = 25;
    const litre = 15;

    if(product === "Galon"){
        total = parseFloat(quantity1) * galon;
    }else if(product === "Litre"){
        total = parseFloat(quantity2) * litre;
    }else{
        total = (quantity1 * galon) + (quantity2 * litre);
    }

    let quanti;
    let cont;

    if(product === "Galon"){
        quanti = quantity1;
    }else if (product === "Litre"){
        quanti = quantity2;
    }else{
        quanti = quantity1, quantity2;
    }

    if(product === "Galon"){
        cont = galon;
    }else if(product === "Litre"){
        cont = litre;
    }else{
        cont = galon, litre;
    }

    let galon_content = {
        prodSelect : product,
        quantity : quanti,
        total : total.toFixed(2),
        pricegal : cont,
        payment : paymentMode
    };



            products.push(galon_content);
      

    localStorage.setItem("Data", JSON.stringify(products));  // Save to localStorage
    // Here you can add logic to handle the order placement, like sending data to a server.
    alert("Order Pending")
    displayData();
}

displayData();

function loadUsername() {
    // Get the username from localStorage
    const username = localStorage.getItem('username') || 'Guest'; // Default to 'Guest' if no username found

    // Set the username in the homeContent section
    document.getElementById('customerUsername').textContent = username;
}

//Display Data after Placing Order
function displayData(){
    

    let template = "";

        for(let i = 0; i < products.length; i++){
            template += `
            <tr>
                <td>${i+1}</td>
                <td>${products[i].prodSelect}</td>
                <td>${products[i].pricegal}</td>
                <td>${products[i].quantity}</td>
                <td>Searching....</td>
                <td>${products[i].total}</td>
                <td>${products[i].payment}</td>
                <td>
                    <button onclick = "change(${i})">Change Order</button>
                    <button onclick = "cancel(${i})">Cancel Order</button>
                </td>
            </tr>
            `
        }
    orders_content.innerHTML = template;
}

//Pop up Modal
function change(index){
    editIndex = index; // Set the global editIndex
    let prod = products[index];

    document.getElementById("produSelect").value = prod.prodSelect;
    document.getElementById("quant1").value = prod.prodSelect === "Galon" ? prod.quantity : 0; // Set quantity for Galon
    document.getElementById("quant2").value = prod.prodSelect === "Litre" ? prod.quantity : 0; // Set quantity for Litre
    document.getElementById("paymMode").value = prod.payment;

    myModal.style.display = "block";
}

function save(){
    // Get the values from the modal inputs
    const product = document.getElementById("produSelect").value;
    const quantity1 = parseInt(document.getElementById("quant1").value) || 0; // Default to 0 if empty
    const quantity2 = parseInt(document.getElementById("quant2").value) || 0; // Default to 0 if empty
    const paymentMode = document.getElementById("paymMode").value;
    
    // Validate inputs
    if (!product || (!quantity1 && !quantity2) || !paymentMode) {
        alert("Please fill all fields.");
        return;
    }

    // Calculate the total based on the quantities and selected product
    const galon = 25;
    const litre = 15;
    let total = 0;

    if (product === "Galon") {
        total = quantity1 * galon;
    } else if (product === "Litre") {
        total = quantity2 * litre;
    } else {
        total = (quantity1 * galon) + (quantity2 * litre);
    }

    // Create an updated product object
    const updatedProduct = {
        prodSelect: product,
        quantity: (product === "Galon" ? quantity1 : quantity2),
        total: total.toFixed(2),
        payment: paymentMode,
        pricegal: product === "Galon" ? galon : litre
    };

    // Update the product in the products array
    products[editIndex] = updatedProduct;

    // Save the updated products array to localStorage
    localStorage.setItem("Data", JSON.stringify(updatedProduct));

    // Close the modal and refresh the display
    closeModal();
    displayData();
}

function closeModal(){
    myModal.style.display = "none"
}

close.onclick = function() {
    myModal.style.display = "none";
}

//Delete product after clicking yes
function cancel(index){
    if (confirm("Are you sure you want to cancel this Order?")) {
        products.splice(index, 1);  // Remove product from array by original index
        localStorage.setItem("Data", JSON.stringify(products));  // Update localStorage
        displayData();  // Refresh the display
    }
}

// Call this function when the page loads
window.onload = function() {
    loadUsername();
}


