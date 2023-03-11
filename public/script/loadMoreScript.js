let loadMoreBtn = document.getElementById('loadMoreBtn');
let ulList = document.getElementById('ulList');

console.log("sheeeeeeeeeeeeeeeeeeeesh");

let curr = 5;
let limit = 10;

let rqst = new XMLHttpRequest();
rqst.open('GET', '/getProducts');
rqst.send();
rqst.addEventListener('load',()=>{
    let products = JSON.parse(rqst.responseText);
    let noMorePrdct = false;

    loadMoreBtn.addEventListener('click',()=>{
        if(noMorePrdct ){
            alert("no more products")
        }
        // if(limit <= products.length){
        else{
            console.log('loop');
            for(let i = curr; i < limit; i++){
                console.log(i);
                let li = document.createElement('li');
                li.innerText = products[i];
                ulList.appendChild(li);
                if(i == products.length-1) noMorePrdct = true;
            }
            curr = limit;
            limit += 5;
            if(limit > products.length) {
                console.log("here");
                limit = products.length;
            }
        }
        // else{
        //     alert("no more products")
        // }
        
    })
})