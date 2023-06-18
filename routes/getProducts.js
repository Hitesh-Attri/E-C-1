const express = require('express');
const router = express.Router();
const db = require('../sqlConnection')

router.post('/',async (req,res)=>{
    // console.log(req.body, typeof req.body);
    let i = req.body.curr;
    // console.log(i," < getProducts, rqst from load morescript");
    let query = `select * from products;`;
    db.query(query,(err,result)=>{
        if(err) console.log(err)
        else{
            result = JSON.parse(JSON.stringify(result));
            // console.log(result,typeof result," < getProducts.js routes");
            if( i < result.length ){
                result = result.slice(i,i+5);
                res.json({isEmpty: false, theFile2: result});
            }
            else{
                res.json({isEmpty:true, theFile2: []});
            }
        }
    })
})

module.exports = router;