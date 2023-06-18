const express = require('express');
const router = express.Router();
const session = require('express-session');
const db = require('../sqlConnection')

const checkAdmin = require('../middlewares/isAdmin');

router.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

router.route('/').get((req,res)=>{
    if(req.session.is_logged_in) res.redirect('/home');
    else res.render('root',{loggedOut: 0, msg:""});
})

.post(checkAdmin, (req,res)=>{
    let currUser = req.body;
    // res.json({username:req.body.username,password:req.body.password})
    // return;
    // console.log(currUser," << login post req.body")

    // write query to read the tupple from the users db
    let query = `select * from users where username = ?;`;
    // console.log(currUser.username,"< currUser.username")
    db.query(query, [currUser.username], (err,result)=>{
        if(err) console.log(err," < login post ")
        else {
            // console.log(result,typeof result,"<< login route js");
            result = JSON.parse(JSON.stringify(result))
            // console.log(result,typeof result,"<< login route js stkovrflw");

            if(result.length!=0){
                // in this block, => username exists, now check if the password is correct or not
                if(currUser.password == result[0].password){
                    // here password is correct , => now check if the user's email is verified or not
                    if(result[0].isverified){
                        req.session.isAdmin = false;
                        req.session.is_logged_in = true;
                        req.session.email = result[0].email;
                        req.session.uid = result[0].id;
                        req.session.username = currUser.username;
                        res.redirect("/home");
                    }
                    else{
                        // in this block, => user's email is not verified
                        res.render('root', { loggedOut:-1, msg:"Please verify your email!"});
                        return;
                    }   
                }else{
                    // password is wrong
                    res.render('root', { loggedOut:-1, msg:"Invalid Credentials (1)!"});
                }
            }
            else if(result.length == 0){
                // is this block, username doesn't exists
                res.render('root', { loggedOut:-1, msg:"Invalid Credentials (2)!"});
            }
        }
    })
})

module.exports = router;