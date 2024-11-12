function displayBothOrder() {
    const order_content = document.getElementById(`order_content`);

    let bothP = "";

        
        for(let i = 0; i < bothProd.length; i++){
            bothP += `
                        <tr>
                            <td>${i+1}</td>
                            <td>
                                <button onclick="viewBothOrder(${i})">View Receipt</button>
                            </td>
                            <td>
                                <button>Edit</button>
                                <button onclick="cancelDoubleOrder(${i})">Cancel</button>
                            </td>
                        </tr>`
        }
        order_content.innerHTML = bothP;
}


function viewBothOrder(index){
    let product = bothProd[index];  // Get the product by original index
   
    document.getElementById("bothName").innerText = product.Name;
    document.getElementById("galonPrice").innerText = product.Galon;
    document.getElementById("galonQuant").innerText = product.QuantityForGalon;
    document.getElementById("litrePrice").innerText = product.Litre;
    document.getElementById("litreQuant").innerText = product.QuantityForLitre;
    document.getElementById("orderDate").innerText = product.Date;
    document.getElementById("orderTotal").innerText = product.Total;
    document.getElementById("orderMOP").innerText = product.MOP;
    modal.style.display = "block";
}


    <div id="bothModal" class="modal">
        <div class="modal-content">
            <span class="bothClose">&times;</span>
            <h2 id="bothName"></h2>
            <p class="align"><strong>Price for Galon:</strong><br><span id="galonPrice"></span></p>
            <p class="align"><strong>Quantity for Galon:</strong><br><span id="galonQuant"></span></p>
            <p class="align"><strong>Price for Litre:</strong><br><span id="litrePrice"></span></p>
            <p class="align"><strong>Quantity for Litre:</strong><br><span id="litreQuant"></span></p>
            <p class="align"><strong>Date Ordered:</strong><br><span id="orderDate"></span></p>
            <p class="align"><strong>Total:</strong><br><span id="orderTotal"></span></p>
            <p class="align"><strong>Mode Of Payment:</strong><br><span id="orderMOP"></span></p>
        </div>
     </div>