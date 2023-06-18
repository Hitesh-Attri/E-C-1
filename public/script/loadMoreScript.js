let loadMoreBtn = document.getElementById('loadMoreBtn');

console.log("sheeeeeeeeeeeeeeeeeeeesh");

var curr = 5;
let num = 5;
let flag = true;
let limit = 10;

loadMoreBtn.addEventListener('click', () => {

    let reqst = new XMLHttpRequest();
    reqst.open("POST", '/getProducts');
    reqst.setRequestHeader('Content-Type', 'application/json');
    console.log(curr,"just before the rqst ")
    reqst.send(JSON.stringify({curr: curr}));
    reqst.addEventListener('load', () => {
        // console.log(reqst.responseText, typeof reqst.responseText);
        let obj = JSON.parse(reqst.responseText);
        // console.log(obj, typeof obj, " the obj");
        // console.log(obj.theFile2, typeof obj.theFile2, "the products");
        
        if (obj.isEmpty) {
            flag = false;
            alert("no more products");
            loadMoreBtn.disabled = true;
        }
        else {
            console.log('loop');
            let products = obj.theFile2;

            for (let i = 0; i < products.length; i++) {
              
                let t = `
                    <div class="product"  style="background: #fff; height: 20rem;">
                    <div class="text-center" style="height: 13rem;">
                        <img src="${products[i].fileName}"  style="height: 100%; width: 80%;" />
                    </div>
                    <p>${products[i].productName}</p>
                    <div class="my-2 text center d-flex" id="${products[i].productId}">
                        <a href="/product/details/${products[i].productId}" class="btn btn-secondary btn-sm mx-2 viewDetails">View details</a>
                    
                        <button id="${products[i].productId}" class="btn btn-secondary btn-sm addToCartBtn"  >Add to cart</button>
                    </div> 
                    </div>
                    <br/> 
                `

                let div1 = document.createElement('div');
                div1.className = "col-md-3"
                div1.innerHTML= t;
                document.getElementById('parDiv').appendChild(div1);
                
                num++;
                if (i == products.length - 1) noMorePrdct = true;
            }
            addTocartListener();

            // curr = limit;
            limit += 5;
            if (limit > products.length) {
                console.log("here");
                limit = products.length;
            }
        }
    })
    if(flag) curr = curr + 5;
})


function addTocartListener(){
    let addToCartBtnArr = document.getElementsByClassName('addToCartBtn');
    for(let i=0;i<addToCartBtnArr.length;i++){
        addToCartBtnArr[i].addEventListener('click',(event)=>{
            console.log("here",i,event.target.id);
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
    }
}

addTocartListener();

// let viewDetails = document.getElementsByClassName('viewDetails');
// for(let i=0;i<viewDetails.length;i++){
//     viewDetails[i].addEventListener('click',(event)=>{
//         console.log("here vB",i,event.target.id);

//         var popup = window.open("popup.html", "Popup", "width=400,height=300");
//         // view detais here
//         let productId = event.target.id;

//         let xhr = new XMLHttpRequest();
//         xhr.open('POST','/cart');
//         xhr.setRequestHeader('Content-Type','application/json');
//         // xhr.send(JSON.stringify({productId:productId}));
//         xhr.addEventListener('load',()=>{
//             // console.log('xhr response >',xhr.responseText);
//             let obj = JSON.parse(xhr.responseText)
//             alert(obj.msg);
//         })
//     })
// }

