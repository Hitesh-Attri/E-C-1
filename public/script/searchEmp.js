let searchBtn = document.getElementById('searchBtn')
let clearBtn = document.getElementById('clearBtn')

let nameInput = document.getElementById("nameSearch")
let mobileInput = document.getElementById("mobileSearch")

searchBtn.addEventListener('click',()=>{
    let name = nameInput.value;
    let mobile = mobileInput.value;

    let obj= {
        name: name.trim(),
        mobile: mobile.trim()
    }
    let xhr = new XMLHttpRequest();
    xhr.open('POST','/searchUser');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify(obj));
    xhr.addEventListener('load',()=>{
        console.log('search xhr response >');
    })
})

clearBtn.addEventListener('click',()=>{
    nameInput.value = "";
    mobileInput.value = "";
})




let editBtnArr = document.getElementsByClassName('editBtn');
for(let i=0;i<editBtnArr.length;i++){
    editBtnArr[i].addEventListener('click',(event)=>{
        let id = event.target.id;

        console.log("edit btn",i,id);

        obj = {
            id:id
        }

        let xhr = new XMLHttpRequest();
        xhr.open('PUT','/searchUser');
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.send(JSON.stringify(obj));
        xhr.addEventListener('load',()=>{
            console.log('edit xhr response >',xhr.responseText);
            
        })
    })
}









let deleteBtnArr = document.getElementsByClassName('deleteBtn');
for(let i=0;i<deleteBtnArr.length;i++){
    deleteBtnArr[i].addEventListener('click',(event)=>{
        let id = event.target.id;

        console.log("delete btn",i,id);

        obj = {
            id:id
        }

        let xhr = new XMLHttpRequest();
        xhr.open('DELETE','/searchUser');
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.send(JSON.stringify(obj));
        xhr.addEventListener('load',()=>{
            console.log('delete xhr response >',xhr.responseText);
            let obj = JSON.parse(xhr.responseText);
            if(obj.success) {
                // delete that tr
            }
            // else alert(obj.msg)

        })
    })
}