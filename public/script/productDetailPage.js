console.log("productDetailPage shuuuuiiiiiiiiiii")

let addToCartBtnArr = document.getElementsByClassName('addToCartBtn');
// console.log(addToCartBtnArr)


addToCartBtnArr[0].addEventListener('click',(event)=>{
    console.log("here",event.target.id);
    // add to cart implement here
    let productId = event.target.id;

    let xhr = new XMLHttpRequest();
    xhr.open('POST','/cart');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify({productId:productId}));
    xhr.addEventListener('load',()=>{
        // console.log('xhr response >',xhr.responseText);
        let obj = JSON.parse(xhr.responseText)
        alert(obj.msg);
    })
})
