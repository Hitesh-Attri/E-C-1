console.log("weeeeee")


let form = document.getElementById('changePassForm');
form.addEventListener('submit', (event) => {

    let newPassVal = document.getElementById('newPass').value;
    let confirmPassVal = document.getElementById('confirmPass').value;

    newPassVal = newPassVal.trim();
    confirmPassVal = confirmPassVal.trim();

    if(newPassVal == "" || confirmPassVal == ""){
        event.preventDefault();
        alert("-__- Field Empty!");
        form.reset();
    }else if( newPassVal != confirmPassVal ){
        event.preventDefault();
        alert("-__- Enter same password");
        form.reset();
    }
})
