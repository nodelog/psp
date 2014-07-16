var User = require('./../models/User.js');
var util = require('./util.js');
var getCount = function (callback) {
    User.getCount(function (err, total) {
        callback(err, total);
    });
};
exports.findByPage = function (req, res) {
    getCount(function (err, total) {
        var page = req.query.page;
        var totalPage =  Math.ceil(total/10);
        if(!err && total>0){
            page=page<1?1:page;
            page=page>totalPage?totalPage:page;
                User.findByPage(page,function(err, docs){
                    res.render("manager/user",{docs:docs,title:"User List",page:page,totalPage:totalPage});
                });
        }else{
            console.log("data error");
            res.render("manager/user",{docs:{},title:"User List",page:page,totalPage:totalPage});
        }
    });
}


exports.switch = function (req, res) {
    var id = req.body.id;
    var status = req.body.status;
    User.updateStatus(id,status,function(err){
        if(err){
           console.log(err.message);
        }
    });
}
exports.delete = function (req, res) {
    var id = req.body.id;
    User.delete(id,function(err){
        if(!err){
            res.json({'success':true,'msg':"delete success"});
        }else{
            res.json({'success':false,'msg':"delete failure"});
        }
    });
}
exports.findAll = function (req, res) {
    User.findAll(function(err,docs){
        res.render("manager/user",{docs:docs,title:"User List"});
    });
}

var findUserByName = function (userName, callback) {
    User.findByName(userName, function (err, obj) {
        callback(err, obj);
    });
};
//register
exports.addUser = function (req, res) {
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
            if(obj.status==1){
                obj=null;
            }
            if (obj != null) {
                if (obj.password == password) {//success
                    success = true;
                    msg = "sign in success";
                    var session = req.session;
                    req.session.user = obj;
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
    res.redirect("/");
};

