function checkAdminAuth(req, res, next){
    if(req.session.isAdmin){
        next();
        return;
    }
    else{
        res.send('your are not authorized to access this page');
    }
}

module.exports = checkAdminAuth;