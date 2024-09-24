document.getElementById('bt_login').addEventListener('click', function(event) {
    event.preventDefault(); 

    const url = "https://66e803d4b17821a9d9daf73c.mockapi.io/photo/SignUp";

    let id = document.getElementById('id').value;
    let pass = document.getElementById('password').value;
    let errorMessage = document.getElementById('error_message');
    let userFound = false;

   
    const idPattern = /[A-Z]/;
    if (!idPattern.test(id)) {
        errorMessage.textContent = "ID must contain at least one capital letter.";
        return;
    }

    if (pass.length < 8) {
        errorMessage.textContent = "Password should be at least 8 characters.";
        return;
    }

   
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }
    })
    .then((res) => res.json())
    .then((data) => {
        data.forEach((user) => {
            if (user.ID === id && user.Password === pass) {
                userFound = true;
                sessionStorage.setItem('userName', user.Name); // Save user name in session
                window.location.href = "index.html"; // Redirect to home page on successful login
            }
        });

        if (!userFound) {
            errorMessage.textContent = "Invalid ID or password"; 
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        errorMessage.textContent = "An error occurred during sign-in.";
    });
});
