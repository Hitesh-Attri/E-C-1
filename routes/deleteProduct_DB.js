const express = require('express');
const router = express.Router();
const db = require('../sqlConnection');

router.post('/',(req,res)=>{
    console.log(req.body, " < deleteProduct_DB route")
    // req.body==> { productId: '1680170655404'};

    // write here query to delete product from `products`
    // let query = `delete from products where productId = ?;`;
    let query0 = `update cart_table set isAvailable = false where product_id = ?`
    db.query(query0,[req.body.productId],(err)=>{
        if(err) {
            console.log(err,"err in updating isAvailable = false in cart_table-- deleteProcduct_DB route")
        }
        else{

        }
    })

    let query = `update products set isAvailable = false where productId = ?`
    db.query(query,[req.body.productId],(err)=>{
        if(err) {
            // console.log(err,"delete product DB err, deleteProcduct_DB route")
            console.log(err,"err in updating isAvailable = false in cart_table-- deleteProcduct_DB route")
            res.json({msg:"err in  updating isAvailable = false product from DB",success:false})
        }
        else{

            // add here the functionality to change the deleted item status to NOT AVAILABLE in cart.ejs page.. 
            // add some col which keeps track to the item's availability



            res.json({msg:"product deleted/ unavailable",success:true});
        }
    })
    // res.json({msg:"product deleted",success:true});
})

module.exports = router;