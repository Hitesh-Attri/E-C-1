const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../sqlConnection')

const upload = multer ( { 
    dest:'uploads'
})

router.get('/',  (req,res)=>{
    if(req.session.is_logged_in) res.render('uploadProducts', { adminName: req.session.username, loggedIn: true, isCart:false, isAdmin: true});
    else res.render('root',{loggedOut: 0, msg:""});
})

router.post('/', upload.single('productImage'), (req,res)=>{
    console.log("product img here");
    // console.log(req.body,typeof req.body);

    let productId = Date.now();
    let productName = req.body.productName
    let fileName = req.file.filename
    let description = req.body.productDesc
    let price = req.body.productPrice
    let totalQuantity = req.body.totalQuantity

    let query = `insert into products values(?, ?, ?, ?, ?, ?, true);`; // sql insert
    db.query(query, [productId,productName,fileName,description,price, totalQuantity] ,(err,result)=>{
        if(err) console.log(err)
        else {
            // console.log(result,typeof result);
            console.log("product saved in mysqldb");
            res.send(req.file);
        }
    })
})

module.exports = router;