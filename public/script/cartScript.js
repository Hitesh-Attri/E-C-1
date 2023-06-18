console.log("cart page shuuuiiiiiii")


let itemMinusCartBtnArr = document.getElementsByClassName('minus');
for(let i=0;i<itemMinusCartBtnArr.length;i++){
    itemMinusCartBtnArr[i].addEventListener('click',(event)=>{
        let productId = event.target.id;
        console.log("minus btn",i,productId);
        // add to cart implement here

        obj = {
            isPlus : false,
            productId:productId
        }
        sendPM(obj,productId);
    })
}

let itemPlussCartBtnArr = document.getElementsByClassName('plus');
for(let i=0;i<itemPlussCartBtnArr.length;i++){
    itemPlussCartBtnArr[i].addEventListener('click',(event)=>{
        let productId = event.target.id;
        
        console.log("plus btn",i,productId);
        // add to cart implement here
        obj = {
            isPlus : true,
            productId:productId
        }
        
        sendPM(obj,productId);
    })
}

function sendPM(obj,productId){
    let xhr = new XMLHttpRequest();
    xhr.open('PUT','/cart');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify(obj));
    xhr.addEventListener('load',()=>{
        // console.log('minus put xhr response >',xhr.responseText);
        let obj = JSON.parse(xhr.responseText);
        console.log(obj)

        let theP = document.getElementById(`p${productId}`);
        theP.innerText = obj.quantity;
        // theP.innerText = "X";

    })
}

let deleteItemCartBtnArr = document.getElementsByClassName('deleteBtn');
for(let i=0;i<deleteItemCartBtnArr.length;i++){
    deleteItemCartBtnArr[i].addEventListener('click',(event)=>{
        let productId = event.target.id;

        console.log("delete btn",i,productId);
        // add to cart implement here
        obj = {

            productId:productId
        }

        let xhr = new XMLHttpRequest();
        xhr.open('DELETE','/cart');
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.send(JSON.stringify(obj));
        xhr.addEventListener('load',()=>{
            console.log('delete xhr response >',xhr.responseText);
            let obj = JSON.parse(xhr.responseText);
            if(obj.success) location.reload();
            else alert(obj.msg)

        })
    })
}