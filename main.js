const express = require('express')
const app = express();
const fs = require('fs')
const session = require('express-session');
app.set('view engine','ejs');
const port = 5000;

// for checking the auth.. if logged in
var checkAuth = require('./middlewares/checkAuth');

app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));


app.route('/').get((req,res)=>{
    if(!req.session.is_logged_in){
        res.render('root', {loggedOut: false, msg:""});
    }else{
        res.redirect('/home');
    }
})


app.route('/home').get((req,res)=>{
    if(req.session.is_logged_in){
        // read product json and send to home
        let products;
        fs.readFile(__dirname+"/products.json",'utf-8', (err,data)=>{
            if(data.length === 0) products = [];
            else{
                products = JSON.parse(data);
            }
            // console.log(products, typeof products);
            res.render('home', {username : req.session.username, loggedIn: req.session.is_logged_in, products: products})
        })
    }else{
        console.log("/home->else");
        // console.log(req.session.is_logged_in);
        res.redirect('/login');
    }
})

app.route('/login').get((req,res)=>{
    // console.log("login get", req.session.is_logged_in,"<< session");
    if(req.session.is_logged_in){
        res.redirect('/home');
    }else{
        res.render('root',{loggedOut: false, msg:""});
    }
})
.post((req,res)=>{
    let flag = false;
    let currUser = req.body;
    fs.readFile(__dirname+"/data.json",'utf-8',(error,data)=>{
        let theFile;
        if(data.length === 0){
            theFile =[];
        }else{
            theFile = JSON.parse(data);
        }

        for(let i = 0 ; i < theFile.length;i++){
            if(theFile[i].username === currUser.username && theFile[i].password === currUser.password){
                flag = true;
                req.session.is_logged_in = true;
                req.session.username = currUser.username;
                res.redirect("/home");
            }
        }
        if(!flag){
            res.redirect('/');
        }
    })
})

app.route('/signup').get((req,res)=>{
    res.render('signup',{error:false, msg:""});
})
.post((req,res)=>{
    let flag = false;
    let currUser = req.body;
    fs.readFile(__dirname+"/data.json",'utf-8',(error,data)=>{
        let theFile;
        if(data.length === 0){
            theFile =[];
        }else{
            theFile = JSON.parse(data);
        }

        for(let i = 0 ; i < theFile.length;i++){
            // ||
            if(theFile[i].username === currUser.username && theFile[i].email === currUser.email){
                flag = true;
                console.log("user already exists");

                res.render('signup', {error:true, msg:"User already exists!"})
                // res.redirect("/");
            }
        }
        if(!flag){
            fs.readFile(__dirname+'/data.json','utf-8',(err,data)=>{
                if(data.length === 0) theFile = [];
                else{
                    theFile = JSON.parse(data);
                }
                theFile.push(req.body);
                fs.writeFile(__dirname + "/data.json",JSON.stringify(theFile),(err)=>{
                    console.log("written successfully");
                });
            });
            res.redirect('/');
        }
    })
})

app.get('/getProducts',(req,res)=>{
    fs.readFile(__dirname+'/products.json','utf-8',(err,data)=>{
        if(data.length === 0) theFile = [];
        else{
            theFile = JSON.parse(data);
            // console.log(theFile, typeof theFile,"<<");
        }
        res.json(theFile);
    });
})

app.get('/logout',(req,res)=>{

    if(req.session.is_logged_in){
        console.log("/logout")
        req.session.destroy();
        // res.redirect('/');
        res.render('root',{loggedOut: true, msg:"Logged out!"})
    }
    else{
        res.render('root',{loggedOut: false, msg:"Login to krlo phle :)"})
    }
})

app.get('*',(req,res)=>{
    res.render('404');
});

app.listen(port,(error)=>{
    if(!error) console.log("m-Server running at port,", port);
    else console.log("Error! ", error);
})