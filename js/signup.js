// input elements 
const form = document.querySelector("#postFormData");
const username = document.querySelector("#username");
const email = document.getElementById("email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const gender = document.querySelector("#gender");
const formFile = document.querySelector("#formFile");
const tel_1 = document.querySelector("#tel-1");
const tel_2 = document.querySelector("#tel-2"); 
const phone = document.querySelector("#phone");
const birthDay = document.querySelector("#birthday");
const birthMonth = document.querySelector("#birth-month");
const birthYear = document.querySelector("#birth-year");
const address = document.querySelector("#address");
const street = document.querySelector("#street");
const floor = document.querySelector("#floor");
const serverResponseBox = document.querySelector("#server-response");

let errors = 0;
const url = 'API_ENDPOINT/insertuser?mode=insert&userType=UW&state=online&userid=0&id=0';

form.addEventListener("submit", (event) => {
    event.preventDefault();
    validiteInputs();
});
 

const setError = (element, message) => {
    const inputControl = element.parentElement; //col
    const errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerText = message;
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    errors ++;
}

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerText = "";
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");

}
const serverMessage = (element, meassge) => {
    serverResponseBox.innerText = "";
    serverResponseBox.innerText = meassge;
} 

const validatePasswords = (passwordValue, password2Value) => {
    // validate first password 
    if(passwordValue === "") {
        setError(password, "Password is required");
        
    } else if (passwordValue.length <= 6) {
        setError(password, "Please enter a password with at least 6 charactars.");
        
    } else {
        setSuccess(password);
    }

    //validate second password 
    if(password2Value === "") {
        setError(password2, "Confirm your password");
    
    } else if (password2Value == passwordValue) {
            if (password2Value.length <= 6) {
                setError(password2, "Please enter a password with at least 6 charactars.");
               
            } else {
                setSuccess(password2);
            }
    } else {
        setError(password2, "Passwords are not matched!");
        setError(password, "Passwords are not matched!");
       
    }
}

const validateMobileNumber = (tel_1Value) => {
     if(tel_1Value === "") {
        setError(tel_1, "Phone numeber is required");
    } else if(tel_1Value.length === 10) {
            if(tel_1Value.toString().substring(0,2) == '09') {
                setSuccess(tel_1);
                        
            } else {
                setError(tel_1, "Start phone number with 09");
              
            }
    } else {
        setError(tel_1, ' Wrong phone number ');
       
    }
}

async function validiteInputs() {
    //capture input values
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const genderValue = gender.value.trim();
    const formFileValue = formFile.value.trim();
    const tel_1Value = tel_1.value.trim();
    const tel_2Value = tel_2.value.trim();
    const phoneValue = phone.value.trim();
    const birthDayValue = birthDay.value.trim();
    const birthMonthValue = birthMonth.value.trim();
    const birthYearValue = birthYear.value.trim();
    const addressValue = address.value.trim();
    const streetValue = street.value.trim();
    const floorValue = floor.value.trim();

    // validation
    usernameValue === "" ? setError(username, 'username is a required filed' ) : setSuccess(username);
    addressValue === "" ? setError(address, " Required filed ") : setSuccess(address);
    streetValue === "" ? setError(street, " required filed ") : setSuccess(street);
    floorValue === floor.firstElementChild.value ? setError(floor, "Choose a floor!") : setSuccess(floor);
    validatePasswords(passwordValue, password2Value);
    validateMobileNumber(tel_1Value);
    console.log("number of errors: " + errors);
    if (errors === 0) {
        form.classList.remove("was-validated");
        const d = url + "&username=" + usernameValue + "&email=" + emailValue + "&password=" + passwordValue + "&gndr=" + genderValue + "&image=" + formFileValue + "&mobile1=" + tel_1Value + "&mobile2=" + tel_2Value + "&phone=" + phoneValue + "&bday=" + birthDayValue + "&bmonth=" + birthMonthValue + "&byear=" + birthYearValue + "&adrs=" + addressValue + "&flor=" + floorValue + "&str=" + streetValue;
        console.log(d);
        try {
            const response = await fetch(url + "&username=" + usernameValue + "&email=" + emailValue + "&password=" + passwordValue + "&gndr=" + genderValue + "&image=" + formFileValue + "&mobile1=" + tel_1Value + "&mobile2=" + tel_2Value + "&phone=" + phoneValue + "&bday=" + birthDayValue + "&bmonth=" + birthMonthValue + "&byear=" + birthYearValue + "&adrs=" + addressValue + "&flor=" + floorValue + "&str=" + streetValue);
            const data = await response.json();
            console.log(data);
            const userID = data[0].res1;
            if(userID > 0) {
                localStorage.setItem("mobileNumber", tel_1Value);
                location.replace("login.html");
            } else {
                switch (userID) {
                    case -1:
                        serverMessage(serverResponseBox, "The email you entered is already exists!");
                        break;
                    case -2:
                        serverMessage(serverResponseBox, "First phone number is already in use!");
                        break;
                    case -3:
                        serverMessage(serverResponseBox,  "Second phone number is already in use!");
                        break;
                    }
            }
        } catch(error) {console.log(error)}
    } else {
        errors = 0;
        form.classList.add("was-validated");
        console.log("errors are cleared now: " + errors);
    }
}
