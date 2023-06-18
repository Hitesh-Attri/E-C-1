
let form = document.querySelector('#signupForm');
form.addEventListener('submit', (event) => {

    let usernameVal = document.getElementById('username').value;
    let emailVal = document.getElementById('email').value;
    let passwordVal = document.getElementById('password').value;

    usernameVal = usernameVal.trim();
    emailVal = emailVal.trim();
    passwordVal = passwordVal.trim();

    if(usernameVal == "" || passwordVal == "" || emailVal == ""){
        event.preventDefault();
        alert("-__- Field Empty!");
        form.reset();
    }
    else{
        document.getElementById("signupSubmitBtn").disabled = true;
        document.getElementById("gotoLogin").disabled = true;
    }
})

