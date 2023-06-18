
let methods = {
    insert : async (userObj)=>{
        try {
            const obj = new DbSchema( userObj );
            const result = await obj.save();
            console.log(result, "< methods try_ insert ()");
        } catch (err) {
            console.log(err,"<< methods catch_ err")
        }
    },
    
    find : async (userObj)=>{
        const doesUserExit = await userDataClctn.exists(userObj);
        console.log(error,"< methods find_ if err")

        if(doesUserExit){
            console.log("user exists")
        }else{
            console.log("user doesnt exits")
        }
    },
    
    update : ()=>{

    },
    
    delete : ()=>{

    }
}

module.exports = methods;