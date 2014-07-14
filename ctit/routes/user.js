var User = require('./../models/User.js');
var util = require('./util.js');

exports.addUser = function (req, res) {//register
    var userName = util.trim(req.body.userName);
    var password = util.trim(req.body.password);
    var password2 = util.trim(req.body.password2);
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
                obj = {"userName": userName, "password": password, "createTime": new Date(), "modifyTime": new Date(), "role": 1, "status": 0};
                User.save(obj, function (err) {
                    if (!err) {
                        success = true;
                        msg = "sign up success, please sign in";
                    } else {
                        console.log(err.message);
                        msg = "sign up error, please try agin";
                    }
                    res.json({'success': success, 'msg': msg});
                });
            }
        });
    }//end else
    if (!flag) {// no callback
        res.json({'success': success, 'msg': msg});
    }
};
var findUserByName = function (userName, callback) {//login
    User.findByName(userName, function (err, obj) {
        callback(err, obj);
    });
};

exports.login = function (req, res) {
    var userName = util.trim(req.body.userName);
    var password = util.trim(req.body.password);
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
            if (obj != null) {
                if (obj.password == password) {
                    success = true;
                    msg = "sign in success";
                } else {
                    msg="password is error";
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

