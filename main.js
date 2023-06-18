// imports
const express = require('express')
const session = require('express-session');

// sql connection
// mysql
const db = require('./sqlConnection');

// for checking the auth.. if logged in
const checkAuth = require('./middlewares/checkAuth');
const checkAdminAuth = require('./middlewares/checkAdminAuth');
const checkAdmin = require('./middlewares/isAdmin');
const sendEmail = require('./methods/sendEmail');
const getProductDetails = require('./methods/getProductDetails');
const verifyMail = require('./methods/verifyMail');

const app = express();
const port = 5000;

// routes
const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const getProductsRoute = require('./routes/getProducts');
const changePassRoute = require('./routes/changePass');
const uploadProductRoute = require('./routes/uploadProduct');
const forgetPassRoute = require('./routes/forgetPass');
const addToCartRoute = require('./routes/addToCart');
const deleteProduct_DBRoute = require('./routes/deleteProduct_DB');
const updateProductRoute = require('./routes/updateProduct');

app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine','ejs');
// app.set('views',"new directory here which will replace views")
app.use(express.json()); 
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use('/css',express.static(__dirname+'/node_modules/bootstrap/dist/css'))

app.route('/jala2').get((req,res)=>{
    // if(!req.session.is_logged_in) res.render('root', {loggedOut: 0, msg:""});
    // else res.sendFile(__dirname+'/public/index.html')
    res.render('jala2',{noUser:false, data:[{key1:"kay1",key2:"key2",key3:"key3"}, {key1:"kay1",key2:"key2",key3:"key3"},{key1:"kay1",key2:"key2",key3:"key3"}]});
})

app.route('/jala1').get((req,res)=>{
    // if(!req.session.is_logged_in) res.render('root', {loggedOut: 0, msg:""});
    // else res.sendFile(__dirname+'/public/index.html')
    res.render('jala1');
})

app.route('/uploadImage').get((req,res)=>{
    // if(!req.session.is_logged_in) res.render('root', {loggedOut: 0, msg:""});
    // else res.sendFile(__dirname+'/public/index.html')
    res.render('uploadImage');
})

app.route('/slider').get((req,res)=>{
    // if(!req.session.is_logged_in) res.render('root', {loggedOut: 0, msg:""});
    // else res.sendFile(__dirname+'/public/index.html')
    res.render('slider');
})

app.route('/home').get( checkAuth, async (req,res)=>{
    // read product table and send to home.ejs

    let query = `select * from products ORDER BY isAvailable DESC;`;
    db.query(query,(err,result)=>{
        result = JSON.parse(JSON.stringify(result));
        // console.log(result, typeof result);
        res.render('home', {username : req.session.username, loggedIn: req.session.is_logged_in, products: result, isAdmin: req.session.isAdmin}) 
        // res.send("/home testing");
    })
})

// routing
app.use('/login', checkAdmin, loginRoute);
app.use('/signup',signupRoute);
app.use('/getProducts', getProductsRoute);
app.use('/changePass',changePassRoute);
app.use('/uploadProduct',checkAdmin, uploadProductRoute);
app.use('/forgetPass',forgetPassRoute);
app.use('/cart',checkAuth,addToCartRoute);
app.use('/deleteProduct_DB',checkAdminAuth, deleteProduct_DBRoute);
app.use('/updateProduct',checkAdminAuth, updateProductRoute);

// in "verifyMailRoute", to acces "token"-> use -> req.params.token;
app.get('/verifyMail/:token',verifyMail);

// app.route('/products/details/:itemId').get(getProductDetail,(req,res)=>{
//     console.log("249")
// });

app.get('/product/details/:itemId',checkAuth,getProductDetails);

app.get('/logout',(req,res)=>{
    if(req.session.is_logged_in){
        console.log("/logout")
        req.session.destroy();
        res.render('root',{loggedOut: 1, msg:"Logged out!"})
    }
    else{
        res.render('root',{loggedOut: false, msg:"Login to krlo phle :)"})
    }
})

app.get('*',(req,res)=>{
    res.render('404');
});

app.listen(port,(error)=>{
    // if(!error) console.log("main--> Server running at port,", port);
    if(!error) console.log(`App listening at http://localhost:${port}`)
    else console.log("Error! ", error);
})