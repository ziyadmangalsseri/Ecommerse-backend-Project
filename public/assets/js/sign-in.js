const form = document.getElementById("signin-form")
	form.addEventListener('submit', (event)=>{
		event.preventDefault();
		const email = document.getElementById('signin-email').value;
		const password = document.getElementById('signin-password').value;
	

	if(email && password){
		console.log('fetch started');
		
		fetch('/api/user/userlogin',{
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify({email ,password}),
		})
		.then(response => {
			if(!response.ok){
				throw new Error(`Network response was not ok (status ${response.status})` );
			}
			return response.json();
		})
		.then(data => {
			if(!data.success){
				console.log(data);
				document.getElementById('showerror').style.display = "block";
				// Provide a more specific error message based on the data.error property
				// document.getElementById('showerror').textContent = data.error;
			}
			else{
				window.location.href = "/home";
			}
		})
		.catch(err=>{
			console.error('error message',err.message);
			// Handle genaral errors here, e.g , display a generic error message 
			document.getElementById('showerror').style.display = "block";
			document.getElementById('showerror').textContent = 'An error occurred . Please try again later.'
		});
	}
	console.log(email,password);
});