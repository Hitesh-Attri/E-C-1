const express = require('express')
const app = express();
const fs = require('fs')
const session = require('express-session');
app.set('view engine','ejs');
const port = 5000;

app.use(express.json()); 

app.use(express.static('public'));
// app.use(express.static('public/login'));
// app.use(express.static('public/signup'));
// app.use(express.static('public/script'));
// app.use(express.static('public/css'));

app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.route('/').get((req,res)=>{
    if(!req.session.is_logged_in){
        // res.sendFile(__dirname + '/public/login/index.html');
        res.render('root');
    }else{
        res.sendFile(__dirname + '/public/home/index.html');
    }
    // res.redirect('/login');
})

app.route('/home').get((req,res)=>{
    if(!req.session.is_logged_in){
        res.sendFile(__dirname + '/public/login/index.html');
    }else{
        console.log("/home->else");
        console.log(req.session.is_logged_in);
        res.redirect('/home');

        // res.sendFile(__dirname + '/public/home/index.html');

    }
})

app.route('/login').get((req,res)=>{
    if(!req.session.is_logged_in){
        res.sendFile(__dirname + '/public/login/index.html');
    }else{
        res.redirect('/home');
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
                // handle this
                // res.redirect("/home");
                res.json({success: true});
            }
        }
        if(!flag){
            // handle this
            // res.redirect('/');
            res.json({success:false});
        }
        // res.json({success: false});
    })
})

app.route('/signup').get((req,res)=>{
    res.sendFile(__dirname + "/public/signup/index.html");
})
.post((req,res)=>{
    // console.log(req.body, typeof req.body);  req.body is the obj of uname,pss,email
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

                // handle this
                // res.redirect("/");
                res.json({success:false});
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
            // handle this
            // res.redirect('/');
            res.json({success:true});
        }
    })

    // res.end();
})

app.get('/logout',(req,res)=>{
    console.log("/logout")
    req.session.destroy();
    // res.send({logout:true});
    res.redirect('/');
})

app.get('*',(req,res)=>{
    res.render('404');
})

app.listen(port,(error)=>{
    if(!error) console.log("Server running at port,", port);
    else console.log("Error! ", error);
})