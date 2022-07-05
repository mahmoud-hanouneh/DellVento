const baseURL = "https://martendo.net/";
const orderURL = "http://mar10test.robotic-mind.com/WebServiceMar10.asmx/payment?"

var ordered = JSON.parse(sessionStorage.getItem("orderedProducts"));

if (sessionStorage.getItem("orderedProducts") && sessionStorage.getItem("orderedProducts").length !== 0){
    document.querySelector("#heading-text").innerText = " Shopping card ";
    document.querySelector("#send-order-btn").classList.remove("d-none");
    JSON.parse(sessionStorage.getItem("orderedProducts")).map((item, index) => {
            document.getElementById("row").innerHTML += `
            <div class="col-xl-6 border rounded shadow" id=${item.productID}> 
                <div class="shopping-card" dir="rtl">
                    <div class="img-container">
                        <img id="sh-card-img" src="${baseURL + item.productImgURL}" alt="">
                    </div>

                    <div class="text-container">
                        <h5 class="fw-bold">${item.productName}</h5>
                        <p class="product-price">Price: ${item.productPrice}</p>

                        <input id="quantity" class="form-control form-control-sm text-center border-bottom" type="text" placeholder="الكمية">
                        <input id="notes" class="form-control form-control-sm text-center border-bottom" type="text" placeholder="التفاصيل">
                        <button onclick=removeItem(${item.productID}) type="button" class="btn btn-danger text-center">إزالة من السلّة <ion-icon class="me-2" id="icon" name="trash-outline"></ion-icon></button>
                        

                    </div>
                    
                </div> 
            </div> 
            `
        });
} else {
    document.querySelector("#heading-text").innerText = " Shopping card is empty  "
}

async function sendOrder() {

    if (localStorage.getItem("id")) {
        // capture user data stored in local storage
        var id = localStorage.getItem("id");
        var name = localStorage.getItem("name");
        var address = localStorage.getItem("address");
        var mobile = localStorage.getItem("mobileNumber");
        // reading from session strage
        const aggregate = JSON.parse(sessionStorage.getItem("orderedProducts"));
        const idsArray = aggregate.map(item => item.productID);
        const pids = idsArray.join()
        console.log(idsArray);
        console.log(pids)
        console.log(aggregate)

        var quantities = [];
        for (var i =0; i<idsArray.length; i++) {
           const d =  document.getElementById(idsArray[i]).querySelector("#quantity").value;
           quantities.push(Math.floor(d));
        }
        console.log(quantities)
        const qs = quantities.join();
        console.log(qs);

        var notes = []; 
        for (var j = 0; j<idsArray.length; j++) {
            const e = document.getElementById(idsArray[j]).querySelector("#notes").value.trim();
            notes.push(e);
        }
        const notesString = notes.join();
        console.log(notesString);
        const payment = orderURL + "id=" + id + "&name=" + name + "&address=" + address + "&mobile=" + mobile + "&qs=" + qs + "&pids=" + pids + "&notes=" + notesString + "&pnote=dd";
        
        
        try {
            const response = await fetch(payment);
            const data = await response.json();
            console.log(data);
            sessionStorage.removeItem("orderedProducts");

            
        } catch (err) {
            console.log(err);
        }

        } else {
            location.replace("login.html")
        }
}


function removeItem(id) {
    var ordered = JSON.parse(sessionStorage.getItem("orderedProducts"));

    console.log(id);
    for (var i = ordered.length - 1; i>=0 ; --i) {
        if(Math.floor(ordered[i].productID) === id) {
            ordered.splice(i,1);
        }
    }
    sessionStorage.setItem("orderedProducts", JSON.stringify(ordered));
    console.log(ordered);
    document.getElementById(id).classList.add("d-none");
}
        


            
               