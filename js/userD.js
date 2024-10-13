const orders_content = document.getElementById('orders_content');
const myModal = document.getElementById("myModal");
const close = document.getElementsByClassName("close")[0];

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


let products = JSON.parse(localStorage.getItem("productsData")) || [];  // Load products from localStorage

function placeOrder() {
    const product = document.getElementById('productSelect').value;
    const paymentMode = document.getElementById('paymentMode').value;
    const quantity1 = document.getElementById('quantity1').value;
    const quantity2 = document.getElementById('quantity2').value;
    let total;
    const galon = 25;
    const litre = 15;

    if (!product || !quantity1 && !quantity2 || !paymentMode) {
        alert("Please fill in all fields!");
        return;
    }

    if(product === "Galon"){
        total = parseFloat(quantity1) * galon;
    }else if(product === "Litre"){
        total = parseFloat(quantity2) * litre;
    }else{
        let tGal = parseFloat(quantity1) * galon;
        let tLit = parseFloat(quantity2) * litre;
        total = tGal + tLit;
    }

    let galon_content = {
        prodSelect : product,
        quantity : quantity1,
        total : total.toFixed(2),
        payment : paymentMode,
        pricegal : galon
    };

    let litre_cont = {
        prodSelect : product,
        quantity : quantity2,
        total : total.toFixed(2),
        payment : paymentMode,
        pricegal : litre
    };

    let both_cont = {
        prodSelect : product,
        quantity : quantity2,
        total : total.toFixed(2),
        payment : paymentMode,
        pricegal : galon
    };


        if(product === "Galon"){
            products.push(galon_content);
        }else if(product === "Litre"){
            products.push(litre_cont);
        }else{
            products.push(both_cont);
        }

    localStorage.setItem("productsData", JSON.stringify(products));  // Save to localStorage
    // Here you can add logic to handle the order placement, like sending data to a server.
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
    let product = products[index];

    document.getElementById("produSelect").value = product.prodSelect;
    document.getElementById("quant1").value = product.quantity;
    document.getElementById("quant2").value = product.quantity;
    document.getElementById("paymMode").value = product.payment;

    myModal.style.display = "block";
}

close.onclick = function() {
    myModal.style.display = "none";
}

//Change Product
function save(){
    
}

//Delete product after clicking yes
function cancel(index){
    if (confirm("Are you sure you want to cancel this Order?")) {
        products.splice(index, 1);  // Remove product from array by original index
        localStorage.setItem("productsData", JSON.stringify(products));  // Update localStorage
        displayData();  // Refresh the display
    }
}

// Call this function when the page loads
window.onload = function() {
    loadUsername();
}


