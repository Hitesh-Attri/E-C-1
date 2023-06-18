// const express = require('express');
// const router = express.Router();
const verificaltionConfirmationEmail = require('./verificationConfirmationMail');
const db = require('../sqlConnection');

const verifyMail = async (req,res)=>{
    const token = req.params.token;
    // console.log(token," < verify email js method")

    let query = `select * from users where mailtoken = ?;`;
    db.query(query,[token],(err,result)=>{
        result = JSON.parse(JSON.stringify(result));
        // console.log(result)
        // console.log(result,"verify email theObj print")
    
        if(result.length !=0 ){
            // is this block. mail token exists for theObj. update the mail token to verified:true
            // result[0].isVerified = true;
            let query2 = `update users set isverified = true where mailtoken = ?;`;
            db.query(query2,[token],(err)=>{
                if(err) console.log(err,"< verify mail js. query2");
                
                // req.session.is_logged_in = true;
                // req.session.email = result[0].email;
                // req.session.username = result[0].username;
    
    
                // console.log(result[0].email,"<-", typeof result[0].email)
                verificaltionConfirmationEmail(result[0].email); 
                // console.log(result[0].email,"<<-")
        
                console.log('users table updated, verifyMail.js')
                res.send("Email verified, you can login now");
            })
        }
        else{
            res.render('root', { loggedOut:-1, msg:"invalid email, verification failed"});
        }
        // res.send("verify mail js ")
    })
}

module.exports = verifyMail;