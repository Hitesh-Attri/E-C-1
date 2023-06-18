
let form = document.querySelector('#loginForm');
form.addEventListener('submit', (event) => {

    let usernameVal = document.getElementById('username').value;
    let passwordVal = document.getElementById('password').value;

    usernameVal = usernameVal.trim();
    passwordVal = passwordVal.trim();

    if(usernameVal == "" || passwordVal == ""){
        event.preventDefault();
        alert("-__- Field Empty!");
        form.reset();
    }
    else{
        document.getElementById("loginBtn").disabled = true;
        document.getElementById("gotoSignUp").disabled = true;
        document.getElementById("forgotPassBtn").disabled = true;
    }
})
