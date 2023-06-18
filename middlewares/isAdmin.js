
function checkAdmin(req,res,next){
    const db = require('../sqlConnection');

    let currUser = req.body;
    console.log(req.body, "< req.body in check admin");

    let query0 = `select * from admin where admin_name = ? and admin_password =?`;
    db.query(query0,[currUser.username, currUser.password], (err0 , result0)=>{
        if(err0) console.log(err0, " < err in checking admin_");
        else{
            result0 = JSON.parse(JSON.stringify(result0));
            // console.log(result0, " < result0")
            if(result0.length != 0){   
                req.session.isAdmin = true;
                req.session.is_logged_in = true;
                req.session.email = result0[0].admin_email;
                req.session.uid = result0[0].id;
                req.session.username = currUser.username;
                res.redirect("/home");
                
                // res.render('adminPage1',{adminName: currUser.username});

                // res.send("you are admin");
            }else{
                console.log('not admin');
                next();
            }
        }
    })
}

module.exports = checkAdmin;