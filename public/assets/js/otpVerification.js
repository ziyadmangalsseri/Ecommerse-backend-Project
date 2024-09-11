// const { response } = require("express");

const inputs = document.querySelectorAll("input"),
  button = document.getElementById("verify-button");

// iterate over all inputs
inputs.forEach((input, index) => {
  input.addEventListener("keyup", (e) => {
    // This code gets the current input element and stores it in the currentInput variable
    // This code gets the next sibling element of the current input element and stores it in the nextInput variable
    // This code gets the previous sibling element of the current input element and stores it in the prevInput variable
    const currentInput = input,
      nextInput = input.nextElementSibling,
      prevInput = input.previousElementSibling;
    // if the value has more than one character then clear it
    // if (currentInput.value.length > 1) {
      //   currentInput.value = "";
      //   return;
      // }
      const value = e.target.value;
      if(value && index < inputs.length -1 ){
        inputs[index + 1].focus();
      }
    // if the next input is disabled and the current value is not empty
    //  enable the next input and focus on it
    if (
      nextInput &&
      nextInput.hasAttribute("disabled") &&
      currentInput.value !== ""
    ) {
      nextInput.removeAttribute("disabled");
      nextInput.focus();
    }

    // if the backspace key is pressed
    // if (e.key === "Backspace") {
    //   // iterate over all inputs again
    //   inputs.forEach((input, index2) => {
    //     // if the index1 of the current input is less than or equal to the index2 of the input in the outer loop
    //     // and the previous element exists, set the disabled attribute on the input and focus on the previous element
    //     if (index1 <= index2 && prevInput) {
    //       input.setAttribute("disabled", true);
    //       input.value = "";
    //       prevInput.focus();
    //     }
    //   });
    // }

    if(e.key === "Backspace" && index > 0){
      inputs[index -1].focus();
    }


    //if the fourth input( which index number is 3) is not empty and has not disable attribute then
    //add active class if not then remove the active class.
    if (!inputs[5].disabled && inputs[5].value !== "") {
      button.classList.add("active");
      return;
    }
    button.classList.remove("active");
  });
});

//focus the first input which index is 0 on window load
window.addEventListener("load", () => inputs[0].focus());

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("otp-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputs = document.querySelectorAll("input");
    const otp = Array.from(inputs).map((inputs) => inputs.value).join("");
      console.log(otp);

  if(otp){
    console.log('otpverification fetch is started');
    
    fetch("/api/user/otpVerification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({otp}),
    })
      .then((response) => {

        console.log('status :' ,response.status );
        return response.json();
        
      }) 
      .then((data) => {
        console.log("server response : ",data);
        if (data.success) {
          window.location.href = "/reset-password";
        } else {
          // log the error message
          console.error("Verification failed:", data.message); 
          document.getElementById('resend-email-message').style.display = "block";
          document.getElementById('resendOtp').style.display = "block";
          document.getElementById('verify-button').style.display = 'none';
          
        }
        
      })
      .catch(err=>{
        console.error("Error message :",err);
        
      })
    }else { 
      console.log('otp not found');
      
    }
  });

});
