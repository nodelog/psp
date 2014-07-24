var User = require('./../models/User.js');
var constants = require('./../models/constants.js');
var cmsUtils = require('./cmsUtils.js');
var getCount = function (callback) {
    User.getCount(function (err, total) {
        callback(err, total);
    });
};
exports.findByPage = function (req, res) {
    getCount(function (err, total) {
        var pageObj = cmsUtils.page(req.query.page,total);
        var page = pageObj.page;
        var totalPage = pageObj.totalPage;
        if (!err && totalPage > 0) {
            User.findByPage(page, function (err, docs) {
                res.render("manager/user", {docs: docs, title: "User Manager", page: page, totalPage: totalPage});
            });
        } else {
            console.log("data error");
            res.render("manager/user", {docs: {}, title: "User Manager", page: page, totalPage: totalPage});
        }
    });
}


exports.switch = function (req, res) {
    var id = req.body.id;
    var status = req.body.status;
    User.findById(function (err, obj) {
        if (!err) {
            if (status != constants.USER_ENABLE_STATUS && status != constants.USER_UNABLE_STATUS) {
                status = constants.USER_ENABLE_STATUS;// 设置默认为可用。
            }
            obj.status = status;
            User.update(obj, function (err) {
                if (err) {
                    console.log(err.message + "\n switch status failure");
                }
            });
        } else {
            console.log(err.message + "\n user is not exists");
        }
    });

}
exports.delete = function (req, res) {
    var id = req.body.id;
    User.delete(id, function (err) {
        if (!err) {
            res.json({'success': true, 'msg': "delete success"});
        } else {
            res.json({'success': false, 'msg': "delete failure"});
        }
    });
}

var findUserByName = function (userName, callback) {
    User.findByName(userName, function (err, obj) {
        callback(err, obj);
    });
};

//register
exports.addUser = function (req, res) {
    var userName = (req.body.userName).trim();
    var password = (req.body.password).trim();
    var password2 = (req.body.password2).trim();
    var msg = "";
    var success = false;
    var falg = false;//callback
    if (userName == "") {
        msg = "UserName is empty";
    } else if (password == "") {
        msg = "Password is empty";
    } else if (password2 == "") {
        msg = "Confirm password is empty";
    } else if (password != password2) {
        msg = "The two passwords don't match";
    } else {
        flag = true;
        findUserByName(userName, function (err, obj) {
            if (obj != null) {
                msg = "userName is exists";
                res.json({'success': success, 'msg': msg});
            } else {
                obj = {"userName": userName, "password": password};
                User.save(obj, function (err) {
                    if (!err) {
                        success = true;
                        msg = "sign up success, please sign in";
                    } else {
                        console.log(err.message);
                        msg = "sign up error, please try agin";
                    }
                    console.log("result:" + success);
                    res.json({'success': success, 'msg': msg});
                });
            }
        });
    }//end else
    if (!flag) {// no callback
        res.json({'success': success, 'msg': msg});
    }
};

//login
exports.login = function (req, res) {
    var userName = (req.body.userName).trim();
    var password = (req.body.password).trim();
    var msg = "";
    var success = false;
    var falg = false;//callback
    if (userName == "") {
        msg = "UserName is empty";
    } else if (password == "") {
        msg = "password is empty";
    } else {
        flag = true;
        findUserByName(userName, function (err, obj) {
            if (obj.status == 1) {
                obj = null;
            }
            if (obj != null) {
                if (obj.password == password) {//success
                    success = true;
                    msg = "sign in success";
                    var session = req.session;
                    session.user = obj;
                } else {
                    msg = "password is error";
                }
            } else {
                msg = "userName is not exists";
            }
            res.json({'success': success, 'msg': msg, 'obj': obj});
        });

    }
    if (!flag) {// no callback
        res.json({'success': success, 'msg': msg});
    }
};
exports.logout = function (req, res) {
    req.session.user = null;
    res.json({sucess: true});
};

exports.session = function (req, res) {
    var user = req.session.user;
    res.json({user: user});
}

