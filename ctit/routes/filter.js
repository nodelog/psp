exports.authorize = function(req, res, next) {
    if (!req.session.user) {
        res.render('index',{ title: 'CMS HOME',login:true});
    } else {
        next();
    }
};
exports.authorizeAdmin = function(req, res, next) {
    if (req.session.user.role!=0) {
        res.redirect('/manager');
    } else {
        next();
    }
};