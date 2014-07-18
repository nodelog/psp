exports.authorize = function(req, res, next) {
    if (!req.session.user) {
        res.redirect('/index?login=true');
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