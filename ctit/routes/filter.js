var User = require('./../models/User');
exports.authorize = function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/index?login=true');
    } else {
        next();
    }
};
exports.authorizeAdmin = function (req, res, next) {
    if (req.session.user.role != 0) {
        res.redirect('/manager');
    } else {
        next();
    }
};
exports.createUser = function (req, res, next) {
    User.findByName("admin", function (err, obj) {
        if (obj == null) {
            obj = {
                userName: "admin",
                password: "admin",
                role: 0,//0 super admin,1 normal user
                status: 0
            };
            User.save(obj,function (err) {
                next();
            });
        } else {
            next();
        }
    });
};