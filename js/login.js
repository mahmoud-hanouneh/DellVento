const loginForm = document.querySelector("#loginForm");
const result = document.querySelector("#result");
const url = "API_ENDPOINT/login?";

// auto fill mobile number value from localstorage
document.querySelector("#mobile-login").value = localStorage.getItem("mobileNumber");

// handle submission
loginForm.onsubmit =  (event) => {  
  event.preventDefault();
  chekcInfo();
};

// set server response message
function setResult(element, message) {
  element.innerText = "";
  element.innerText = message;
}


async function chekcInfo() {

  const capturedNumber = document.querySelector("#mobile-login").value.trim();
  const capturedpassword = document.querySelector("#password").value.trim();

  try {
    const response = await fetch(url + "&mobile=" + capturedNumber + "&pw=" + capturedpassword);
    const data = await response.json();
    console.log(data);
      if(data.length === 2) {
        setResult(result, " ");
        
        const [{Username, Uid}, {Adressid}] = data;
        localStorage.setItem("name", Username);
        localStorage.setItem("id", Uid);
        localStorage.setItem("address", Adressid);
        localStorage.setItem("mobileNumber", capturedNumber);
        sessionStorage.setItem("password", capturedpassword);
        console.log(Uid);
        console.log(Username);
        console.log(Adressid);

        const redirectToProducts = () => {
          location.replace("index.html");
        } 
        setTimeout(redirectToProducts, 2000);
      } else {
        setResult(result, "Phone number or password is wrong!");
      }
    } catch (error) {
      console.log(error);
  } 
 
  
}
