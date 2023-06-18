const express = require('express');
const router = express.Router();
const sendEmail = require('../methods/sendEmail');
const sendEmailMailjet = require('../methods/sendEmailMailjet');
const db = require('../sqlConnection');

router.get('/',(req,res)=>{
    if(req.session.is_lged_in) s.redirect('/home');
    else res.render('signup',{error:false, msg:""});
})

router.post('/',  (req,res)=>{

    // console.log(req.body,"post signup")
    
    let currUser = req.body;
    console.log(currUser," << signup post req.body")

   
    let username = req.body.username.trim();
    let email = req.body.email.trim();
    let password = req.body.password.trim();
    let isVerified = false;
    let mailToken = Date.now();


    if(username == "" || email == "" || password == ""){
        res.render('signup',{error:true, msg:"All field required! nJs"});
        return;
    }

    // check here if the username exists in table or not
    let query = `select * from users where username = ?;`;
    db.query(query, [username] ,(err,result)=>{
        if(err){
            res.send(err);
            return;
        } 
        else {
            console.log(result,typeof result);

            if(result.length!=0){
                res.render('signup',{error:true, msg:"User already exists"});
                return;
            }else{
                sendEmail(req, mailToken, (info)=>{
                    console.log("this is sendEmail callback")
                    // console.log(info)

                    let query = `insert into users values(null,?, ?, ?, ?, ?);`; // sql insert
                    db.query(query, [username,email,password,isVerified,mailToken,] ,(err)=>{
                        if(err) console.log(err)
                        else {
                            // console.log(result,typeof result);
                            console.log("user saved in mysqldb successfully");
                            // req.session.is_logged_in = true;
                            // req.session.email = email;
                            // req.session.username = username;
                            // res.redirect('/home');
                            res.render('root', { loggedOut:-1, msg:"Please verify your email! then login"});
                        }
                    })
                })
                sendEmailMailjet( email,(err,resBody)=>{
                    if(err){
                        console.log("m mailjet")
                    }else{
                        console.log("check your mail")
                    }
                })
            }
        }
    })
})

module.exports = router;

