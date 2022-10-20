const requireLogin = (res, req, next) => {
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/auth/login');
    }
    // console.log('requirelogin middleware works!');
    // next();
}


module.exports.requireLogin = requireLogin;