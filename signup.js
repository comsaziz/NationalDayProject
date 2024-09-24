document.getElementById('bt_submit').addEventListener('click', function(event) {
    event.preventDefault(); 

    const url = "https://66e803d4b17821a9d9daf73c.mockapi.io/photo/SignUp";

    let id = document.getElementById('id').value;
    let name = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let pass = document.getElementById('password').value;
    let error = document.getElementById('error_message');

    const idPattern = /[A-Z]/;
    if (!idPattern.test(id)) {
        error.textContent = "ID must contain at least one capital letter.";
        return;
    }

    if (name.length < 5) {
        error.textContent = "Name should be more than 5 characters.";
        return;
    }


    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        error.textContent = "Please enter a correct email.";
        return;
    }

    if (pass.length < 8) {
        error.textContent = "Password should be more than 8 characters";
        return;
    }

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
            ID: id,
            Name: name,
            Email: email,
            Password: pass,
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        window.location.assign("home.html");  
    })
    .catch((error) => {
        console.error("Error:", error);
        error.textContent = "An error occurred during sign-up.";
    });
});
