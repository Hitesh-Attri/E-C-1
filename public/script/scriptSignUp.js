let gotoLoginBtn = document.getElementById('gotoLogin');
let submitBtn = document.getElementById('signUpBtn');


let usernameInput = document.getElementById('username');
let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');

submitBtn.addEventListener('click',()=>{
    let usernameVal = usernameInput.value;
    let emailVal = emailInput.value;
    let passwordVal = passwordInput.value;

    usernameVal = usernameVal.trim();
    emailVal = emailVal.trim();
    passwordVal = passwordVal.trim();

    if(usernameVal == "" || emailVal == "" || passwordVal == ""){
        alert("-__- Field Empty!");
    }
    else{
        const obj = JSON.stringify({
            username: usernameVal,
            email: emailVal,
            password: passwordVal
        })

        let rqst = new XMLHttpRequest();
        rqst.open("POST",'/signup');
        rqst.setRequestHeader('Content-Type',"application/json");
        rqst.send(obj);
        rqst.addEventListener('load',()=>{

            // if(error){
            //     alert("SignUp unsuccessful")
            //     console.log("Error! ", error);
            // }
            // else{
            //     const text = "Account created!\nWant to login?";
            //     if (confirm(text) == true) {
            //         location.href='/login';
            //     } else {
            //         console.log("hein ji ?? login nhi krna ?")
            //     }
            // }
            let respnseInfo = JSON.parse(rqst.responseText);
            console.log(respnseInfo,typeof respnseInfo);
            if(respnseInfo.success == true){
                const text = "Account created!\nWant to login?";
                if (confirm(text) == true) {
                    location.href='/login';
                } else {
                    console.log("hein ji ?? login nhi krna ?")
                }
                usernameInput.value = "";
                emailInput.value = "";
                passwordInput.value = "";
            }
            else{
                alert("SignUp unsuccessful")
                console.log("Error! ", error);
            }

        });
        
        // rqst.addEventListener('error',()=>{
        //     console.log("errrrrr");
        // })

    }

});

gotoLoginBtn.addEventListener('click',()=>{
    location.href='/login';
})