const express = require('express');
const router = express.Router();
const db = require('../sqlConnection');

router.get('/', (req,res)=>{
    // console.log(req.body,"< in get");
    // console.log(req.session.uid,"< in get");
    // let user = await DbSchema.findOne({email: req.session.email});
    // let userCart = user.cart;
    // load cart
    
    let query = `select * from cart_table where user_id = ?;`;
    db.query(query, [req.session.uid], (eru,result)=>{

        if (!eru){

            result = JSON.parse(JSON.stringify(result));
            // console.log(result,"<< get /cart");
    
            // res.send("testing /cart get");
            res.render('cartPage', {username : req.session.username, loggedIn: req.session.is_logged_in, products: result,isAdmin:req.session.isAdmin}) 
        }else{
            res.send(eru);
        }
    })
})

router.post('/', (req,res)=>{
    console.log("imsA >", req.body)
    // add to cart here

    // get current user
    let query = `select * from users where email = ?;`;
    db.query(query,[req.session.email], (err,currUser)=>{
        if(err)console.log(err)
        else{
            currUser = JSON.parse(JSON.stringify(currUser));
            // console.log(currUser," < currUser, addto cart")


            // finding currproduct in cart, if already exists or not
            let query2 = `select * from cart_table where product_id = ? and user_id = ?;`;
            db.query(query2,[req.body.productId,req.session.uid],(err2,result2)=>{
                if(err2) console.log(err2);
                else{
                    result2 = JSON.parse(JSON.stringify(result2));
                    // console.log(result2," < result2, addto cart")

                    if(result2.length != 0){
                        res.json({msg:"Item already in cart!"});
                        return;
                    }
                    else{
                        // get product details
                        let query3 = `select * from products where productid = ?;`;
                        db.query(query3,[req.body.productId],(err3,result3)=>{
                            if(err3) console.log(err3);
                            else{
                                result3 = JSON.parse(JSON.stringify(result3));
                                // console.log(result3," < result3, addto cart")

                                let userid = currUser[0].id
                                let productid = result3[0].productId
                                let productName = result3[0].productName
                                let fileName = result3[0].fileName
                                let description = result3[0].description
                                let price = result3[0].price
                                let quantity = 1
                                let stock = result3[0].stock

                                // cart_table => | user_id | product_id | product_name | file_name | description | price | quantity | 7
                                let query4 = `insert into cart_table values(?, ?, ?, ?, ?, ?, ?, ?,1);`; // sql insert
                                db.query(query4,[userid, productid, productName, fileName, description, price, quantity, stock],(err4)=>{
                                    if(err4) console.log(err4," err4")
                                    else{
                                        res.json({msg:"Item added in cart!"});
                                    }
                                })
                            } 
                        })
                    }
                }
            })
        }
    })
})

router.put('/',(req,res)=>{
    // console.log(req.body," < add to cart put-> req.body")
    let quantity;

    let query1 = `select * from cart_table where product_id = ? and user_id = ?;`;
    db.query(query1, [req.body.productId, req.session.uid], (err1,result1)=>{
        if(err1){
            console.log(err1);
            // res.json({msg:"server under maintanence",quantity:-1});
            res.render('underMaintnce');
        }else{
            result1 = JSON.parse(JSON.stringify(result1));
            // console.log(result1," << result1 addto cart put route");
            quantity = result1[0].quantity;

            if(req.body.isPlus){
                if(quantity < result1[0].stock){
                    quantity++;
                    let query2 = `update cart_table set quantity = ? where user_id = ? and product_id = ?;`;
                    db.query(query2, [quantity, req.session.uid, req.body.productId], (err2)=>{
                        if(err2){
                            console.log(err2)
                            res.render("underMaintnce");
                        }
                        else{
                            res.json({msg:"testing put",  quantity: quantity});
                        }
                    })
                }
                else{
                    res.json({msg:"testing put", quantity: quantity});
                }
            }
            else{
                if(quantity > 1){
                    quantity--;
                    let query3 = `update cart_table set quantity = ? where user_id = ? and product_id = ?;`;
                    db.query(query3, [quantity, req.session.uid, req.body.productId], (err3)=>{
                        if(err3){
                            console.log(err3)
                            res.render("underMaintnce");
                        }
                        else{
                            res.json({msg:"testing put",  quantity: quantity});
                        }
                    })
                }
                else{
                    res.json({msg:"testing put",  quantity: quantity});
                }
            }
        }
        // res.json({msg:"testing put",  quantity:4});
    })
})

router.delete('/',(req,res)=>{
    console.log(req.body)
    // req.body.productId  

    let query = `DELETE FROM cart_table WHERE product_id = ? and user_id = ?;`;
    db.query(query,[req.body.productId, req.session.uid],(err)=>{
        if(err) console.log(err, " < delete route query err")
        if(err) res.json({msg:"error in execnting query",success:false})
        else res.json({msg:'cart delete req',success:true})
    })
    // res.send('cart delete req testing')
})

module.exports = router;