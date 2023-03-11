let gotoSignupBtn = document.getElementById('gotoSignUp');
let loginBtn = document.getElementById('loginBtn');

let usernameInput = document.getElementById('username');
let passwordInput = document.getElementById('password');

loginBtn.addEventListener('click',()=>{
    let usernameVal = usernameInput.value;
    let passwordVal = passwordInput.value;

    usernameVal = usernameVal.trim();
    passwordVal = passwordVal.trim();

    if(usernameVal == "" || passwordVal == ""){
        alert("-__- Field Empty!");
    }
    else{
        const obj = JSON.stringify({
            username: usernameVal,
            password: passwordVal
        });

        let rqst = new XMLHttpRequest();
        rqst.open("POST",'/login');
        rqst.setRequestHeader('Content-Type',"application/json");
        rqst.send(obj);
        rqst.addEventListener('load',()=>{

            let respnseInfo = JSON.parse(rqst.responseText);
            console.log(respnseInfo,typeof respnseInfo);
            
            if(respnseInfo.success == true){
                usernameInput.value = "";
                passwordInput.value = "";
                location.href = '/home';
            }
            else{
                alert("Login unsuccessful!\nInvalid credentials!");
            }
        });
    }
});

gotoSignupBtn.addEventListener('click',()=>{
    location.href='/signup';
})
