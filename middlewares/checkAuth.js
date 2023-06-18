function checkAuth(req, res, next){
    if(req.session.is_logged_in){
        next();
        return;
    }
    else{
        res.redirect('/login');
    }

    // 
}

module.exports = checkAuth;