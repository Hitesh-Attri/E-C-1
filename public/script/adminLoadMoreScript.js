let loadMoreBtn = document.getElementById('loadMoreBtn');

console.log("what's going on bunty ??");

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
        }
        else {
            console.log('loop');
            let products = obj.theFile2;

            for (let i = 0; i < products.length; i++) {
                let t = `
                    <div class="product" style="background: #fff; height: 25rem;">
                        <div class="text-center" style="height: 13rem;">
                            <img src="${products[i].fileName}"  style="height: 100%; width: 80%;" />
                        </div>
                        <br>
                    
                        <div class="my-3 text center d-flex" id="${products[i].productId}">

                            <form id="${products[i].productId}" class="updateProduct" method="POST" action="/" enctype="multipart/form-data">
                                <label for="productName">Product name:</label>
                                <input  type="text" name="productName" id="productName${products[i].productId}" placeholder="Product Name" value="${products[i].productName}" required /> <br/>

                                <label for="productName">Product Desc:</label>
                                <input type="text" name="productDesc" id="productDesc${products[i].productId}" placeholder="Product Desc" value="${products[i].description}" required /> <br/>

                                <label for="productName">Product Price:</label>
                                <input type="number" name="productPrice" id="productPrice${products[i].productId}" placeholder="Product Price" value="${products[i].price}" required /> <br/>

                                <label for="productQuantity">Product Quantity:</label>
                                <input type="number" name="productPrice" id="productQuantity${products[i].productId}" placeholder="Product Quantity" value="${products[i].stock}" required /> <br/>

                                <input type="submit" value="Update" class = "btn btn-sm btn-primary"/>
                                <button id="${products[i].productId}" class="btn btn-danger btn-sm deleteProduct">Delete</button>

                            </form>

                        </div> 
                    </div>
                    <br/> 
                `

                let div1 = document.createElement('div');
                div1.className = "col-md-4"
                div1.id = id=`div${products[i].productId}`
                div1.innerHTML= t;
                document.getElementById('parDiv').appendChild(div1);
                
                num++;
                if (i == products.length - 1) noMorePrdct = true;
            }
            deleteProductListener();
            formListener();

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


function deleteProductListener(){
    let deletetBtnArr = document.getElementsByClassName('deleteProduct');
    // console.log(deletetBtnArr, " deletebtnarr");
    for(let i=0;i<deletetBtnArr.length;i++){
        deletetBtnArr[i].addEventListener('click',(event)=>{
            event.preventDefault();
            console.log("deleteProduct",i,event.target.id);


            // deletetBtnArr[i].style.backgroundColor = "blue";
            // add to cart implement here
            let productId = event.target.id;
            // let i1 = i;

            let xhr = new XMLHttpRequest();
            xhr.open('POST','/deleteProduct_DB');
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.send(JSON.stringify({productId:productId}));
            xhr.addEventListener('load',()=>{
                // console.log('xhr response >',xhr.responseText);
                let obj = JSON.parse(xhr.responseText)
                // alert(obj.msg);
                console.log(obj.msg);
                console.log(`div${productId}`)
                if(obj.success) document.getElementById(`div${productId}`).remove();
                else alert("under maintenance")
                // location.reload(); // for reloading page
            })
        })
    }
}

function formListener(){
    let form = document.getElementsByClassName('updateProduct');
    // console.log(form);
    for(let i=0;i<form.length;i++){
        form[i].addEventListener('submit', (event) => {
            event.preventDefault();
            console.log("update form testing <", event.target.id, " < ", i);
            const id = event.target.id;

            const data = {
                productId : event.target.id,
                productName : document.getElementById(`productName${id}`).value,
                productDesc : document.getElementById(`productDesc${id}`).value,
                productPrice : document.getElementById(`productPrice${id}`).value,
                totalQuantity : document.getElementById(`productQuantity${id}`).value
            }
            
            // const data = new FormData(form[i]);
            const reqst = new XMLHttpRequest();
            reqst.open('POST', '/updateProduct');
            reqst.setRequestHeader('Content-Type', 'application/json');
            reqst.send(JSON.stringify(data));
            reqst.addEventListener('load', () => {
                // data contains the img filename
                const data = JSON.parse(reqst.responseText);
                // obj.file = data.filename;
                console.log(reqst.responseText);
                alert(data.msg);
                // console.log(data.filename);
                // form.reset();
            });
        })
    }
}

deleteProductListener();
formListener();

