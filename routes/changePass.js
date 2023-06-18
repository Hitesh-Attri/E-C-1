const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const db = require('../sqlConnection');
const sendPCmail = require('../methods/passChangeMail');


router.get('/',checkAuth,(req,res)=>{
    res.render('changePass', {error:false, msg: "from get"});
})

router.post('/',checkAuth,async (req,res)=>{
    let currData = req.body;
    // console.log(currData , typeof req.body);

    // res.send("testing change pass")
    // return;

    // currData.userEmail = currData.userEmail.trim();
    currData.newPass = currData.newPass.trim();
    currData.confirmPass = currData.confirmPass.trim();

    // if(currData.newPass == "" || currData.confirmPass == "" || currData.userEmail==""){
    if(currData.newPass == "" || currData.confirmPass == "" ){
        res.render("changePass", { error: false, msg:"field cant be empty!"});
        return;
    }
    // else if(currData.email != req.session.email){
    //     res.render("changePass", { error: false, msg:"!. enter your own email,user!"});
    // }
    else if(currData.newPass != currData.confirmPass){
        res.render("changePass", { error: false, msg:"Password doesn't match!"});
        return;
    }
    else{
        let query = `update users set password = ? where email = ?;`;
        db.query(query,[currData.newPass, req.session.email],(err)=>{
            if(err){
                console.log(err);
                res.render('404');
            } 
            else{
                // console.log(currData.newPass,"<<");
        
                res.render("changePass", { error: false, msg:"Password Changed Successfully!"});

                //;;;;;
                // sendPCmail()
            }
        })
    }
})

module.exports = router;