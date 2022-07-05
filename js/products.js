if (localStorage.getItem("id")) {
    document.getElementById("login-logout-btn").innerText = "";
    document.getElementById("login-logout-btn").innerText = "Logout";
    document.getElementById("login-logout-btn").classList.remove("nav-link");
    document.getElementById("login-logout-btn").classList.remove("login-link");
    document.getElementById("login-logout-btn").classList.add("btn");
    document.getElementById("login-logout-btn").classList.add("btn-outline-dark");
    
}

var shopNcounter = 0;
const baseURL = "https://martendo.net/";
const idsArray = [];
const divRow = document.querySelector(".row");
const buttonContainer = document.querySelector("#button-container")
//create column div
function createDiv() {
	const div = document.createElement("div");
    div.classList.add("col-xl-3");
    div.classList.add("col-md-6");
    div.classList.add("col-sm-12");
	return div;
}
async function getData(id) {
		++ shopNcounter;
        console.log(shopNcounter);
        if(shopNcounter > 5) {
            getProInfo(id);
            return;
        } else if (shopNcounter > 4) {
			buttonContainer.innerHTML = "";
            getProducts(id);
            return;
        }

        if (!idsArray.includes(id)) {
		    idsArray.push(id);
        }

		console.log(id);
		console.log(idsArray);
		// if(idsArray.length > 10) {
		// 	idsArray.splice(0,6);
		// }
		const api = `API/shopping?shop=${shopNcounter}&id=${id}`;
        try {
			const response = await fetch(api);
			const data = await response.json();
			divRow.innerHTML = "";
			if (shopNcounter > 1) {
				buttonContainer.innerHTML = `
					<button class="btn btn-lg btn-warning px-5" onclick="moveBack()">رجوع</button>

				`
			} else {
				buttonContainer.innerHTML = "";
			}
				//mapping through data
			data.map((item, index) => {
				
					const div = createDiv();
					divRow.appendChild(div);
					div.innerHTML+=`
					<div id="${item.id}" class="card text-center h-100 mx-auto border-white shadow" style="width: 16rem;">
                        <img src="${baseURL + item.image}" class="card-img-top mx-auto" alt="...">
                        <div class="card-body">
                        
                        <a id="goToItemButton" 
                        onclick=handleClick(${item.id}) 
                        class="btn btn-outline-dark px-5 mt-4">${item.name}
                        </a>
                        </div>
                    </div>
					`;
			});
      	} catch(error) {console.log(error);}
		
    }
getData(0);

let productPageElements; 

async function getProducts(id) {


    console.log("Get Product is being executing");
    const apiProducts = `API/product?id=${id}`;

    try {
        const response = await fetch(apiProducts);
        const data = await response.json();
        console.log(data);
        productPageElements = data;
		divRow.innerHTML = "";
		buttonContainer.innerHTML = "";
        buttonContainer.innerHTML = `<button class="btn btn-lg btn-warning px-5" onclick="moveBack(${idsArray[idsArray.length-2]})">العودة</button>`;
        
        //mapping through data
		data.map((item, index) => {

            const div = createDiv();
            divRow.appendChild(div);
            div.innerHTML+=`
				<div id=${index} class="card text-center h-100 mx-auto border-white shadow" style="width: 16rem;">
                    <img src="${baseURL + item.image}" loading="lazy" class="card-img-top mx-auto" alt="...">
                    <div class="card-body">
                        <h5>${item.PName}</h5>
                        <p class="product-price">Price: ${item.PSelPrice}</p>
                        <a id="add-to-card-btn" onclick=saveProduct(${index}) class="btn btn-danger px-5 mt-4"> أضف إلى السلّة </a>
                        <a id="remove-from-card-button" onclick=removeProduct(${index}) class="btn btn-warning px-5 mt-4 d-none"">   إذالة من السلّة </a>
                    </div>
                </div>
                `;
        });
    } catch(error) {
        console.log(error);
    }
    console.log(productPageElements);
}

function moveBack() {
}
function handleClick(id) {
    // show the spinner 
    document.getElementById(id).querySelector("#goToItemButton").onclick = "";
    document.getElementById(id).querySelector("#goToItemButton").classList.remove("btn-outline-dark");
    document.getElementById(id).querySelector("#goToItemButton").classList.add("btn-dark");
    document.getElementById(id).querySelector("#goToItemButton").innerText = "";
    document.getElementById(id).querySelector("#goToItemButton").innerHTML = `
    <div id="spinner" class="spinner-border text-warning" role="status">
    </div>
    `;
    // fetch data
    getData(id);
}
var orderedProducts = [];
var addOne = 0;

function saveProduct(i) {
    const prodContainer = document.getElementById(i);
    prodContainer.querySelector("#add-to-card-btn").classList.add("disabled");
    prodContainer.querySelector("#remove-from-card-button").classList.remove("d-none");
    console.log(prodContainer);
    const proDetailes = {
        productName : productPageElements[i].PName,
        productID: productPageElements[i].PID,
        productImgURL: productPageElements[i].image,
        productPrice: productPageElements[i].PSelPrice
        }

    orderedProducts.push(proDetailes);
    console.log(orderedProducts);
    sessionStorage.setItem("orderedProducts", JSON.stringify(orderedProducts));
    document.getElementById("added-products").innerText = "";
    document.getElementById("added-products").innerText = ++ addOne ;
    sessionStorage.setItem("addedProducts", addOne);

}

function removeProduct(ind) {
   const prodContainer = document.getElementById(ind);

   let check =  orderedProducts
        .map(item => item.productID)
        .includes(productPageElements[ind].PID)

   if (check) {
    for (let i = orderedProducts.length - 1; i >= 0; --i) {
        if (orderedProducts[i].productID === productPageElements[ind].PID) {
            orderedProducts.splice(i,1);
         }
      }
   }
   sessionStorage.setItem("orderedProducts", JSON.stringify(orderedProducts));
   prodContainer.querySelector("#add-to-card-btn").classList.remove("disabled");
   prodContainer.querySelector("#remove-from-card-button").classList.add("d-none");
   document.getElementById("added-products").innerText = "";
   document.getElementById("added-products").innerText = -- addOne ;
   sessionStorage.setItem("addedProducts", addOne);
}
