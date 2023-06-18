const express= require('express');
const app = express();
app.use(express.static('uploads'));
const db = require('../sqlConnection');

const getProductDetails = (req,res)=>{
    const itemId = req.params.itemId;
    let query = `select * from products where productId = ?;`;
    db.query(query, [itemId], (err,result)=>{
        if(err) console.log(err)
        else{
            result = JSON.parse(JSON.stringify(result));
            console.log(result)
            if(result.size != 0){
                res.render('productDetails', {username:req.session.username, loggedIn:req.session.is_logged_in, isCart:true, product:result[0], isAdmin: req.session.isAdmin});
            }
            else{
                res.send("some issue.. result.len == 0 ")
            }
        }
    })
    // res.send(":)")
}

module.exports = getProductDetails;