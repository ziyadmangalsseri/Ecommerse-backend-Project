

const form = document.getElementById('forgot-password-form')
form.addEventListener('submit',(event)=>{
  event.preventDefault();
  const email = document.getElementById('forgotemail').value;
  console.log(email);
  

if(email){
  console.log('forgotpassword fetch is started');
   
  fetch("api/user/forgotPassword",{
    method : 'POST',
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({email}),
  })
  .then(response => response.json())
  .then(data =>{

     if(data.success){

      document.getElementById('success-message').style.display = 'block';
      setTimeout(() => {
        window.location.href = "/otpverification"
      }, 2000);
    }
    else{
      console.log(data);
      document.getElementById('showerror').style.display = "block";
      
    }
  })
  .catch(err =>{
    console.error("Error message",err);
  });
    
}

});

  

