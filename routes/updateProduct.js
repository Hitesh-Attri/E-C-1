const express = require('express');
const router = express.Router();
const db = require('../sqlConnection')


router.post('/',(req,res)=>{
    console.log(req.body, typeof req.body, " < updateProduct route test");

    let productId = parseInt(req.body.productId);
    let productName = req.body.productName
    let description = req.body.productDesc
    let price = parseInt(req.body.productPrice)
    let totalQuantity = parseInt(req.body.totalQuantity)

    // console.log(productName, description, price, totalQuantity , " << checking for form values in update products")

    // let query = `update products set productName = ? and description = ? and price = ? and stock = ? where productId = ?;`; // sql `products update col
    let query = `update products set productName = ?, description = ?, price = ?, stock =  ? where productId = ?;`; // sql `products update col
    db.query(query, [productName, description, price, totalQuantity, productId] ,(err)=>{
        if(err){
            console.log(err)
            res.json({msg:"server under manintanence",success:false});
        } 
        else {
                console.log("product updated in mysqldb `products`");
                res.json ({msg:"product updated", success:true});
        }
    })
})

module.exports = router;