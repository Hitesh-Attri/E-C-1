const express = require('express');
const router = express.Router();
const session = require('express-session');
const db = require('../sqlConnection');

router.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

router.get('/',(req,res)=>{
    if(req.session.is_logged_in) res.redirect('/home');
    else res.render('forgetPass');
})

router.post('/', async (req,res)=>{
    let flag = false;
    let currUser = req.body;
    console.log(currUser);
    let query = `select * from users where email = ?;`;
    db.query(query,[currUser.email],(err,result)=>{
        result = JSON.parse(JSON.stringify(result));
        if(err) console.log(err);
        else if(result.length != 0){
            if(result.length != 0){
                if(result[0].isverified){
                    flag = true;
                    // write here the query to update the password of req.body.email
                    let query2 = `update users set password = ? where email = ?;`;
                    db.query(query2,[currUser.password, currUser.email],(err)=>{
                        if(err) console.log(err)
                        else{
                            console.log('f-p -> updated');
                            res.render('root', { loggedOut:-1, msg:"Login with your new password"});
                            return;
                        }
                    })
                }
                else{
                    res.render('root', { loggedOut:-1, msg:"Please verify your email!"});
                    return;
                }  
            }
        }
        else{
            if(!flag) res.render('root', { loggedOut:-1, msg:"Invalid email id!"});
        }
    })

})

module.exports = router;