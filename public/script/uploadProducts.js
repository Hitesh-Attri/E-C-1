let form = document.querySelector('#uploadProduct');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (document.getElementById('productImg').value == "") {
        alert("Please select an image!");
    }
    else {
        const data = new FormData(event.target);
        const reqst = new XMLHttpRequest();
        reqst.open('POST', '/uploadProduct');
        reqst.send(data);
        reqst.addEventListener('load', () => {
            // data contains the img filename
            const data = JSON.parse(reqst.responseText);
            // obj.file = data.filename;
            console.log(data);
            // console.log(data.filename);
            form.reset();
        });
    }
})
