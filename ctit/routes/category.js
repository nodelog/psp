var Category = require('./../models/Category.js');
var util = require('./util.js');
var getCount = function (callback) {
    Category.getCount(function (err, total) {
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
                Category.findByPage(page,function(err, docs){
                    res.render("manager/category",{docs:docs,title:"Category List",page:page,totalPage:totalPage});
                });
        }else{
            console.log("data error");
            res.render("manager/category",{docs:{},title:"Category List",page:page,totalPage:totalPage});
        }
    });
}


exports.delete = function (req, res) {
    var id = req.body.id;
    Category.delete(id,function(err){
        if(!err){
            res.json({'success':true,'msg':"delete success"});
        }else{
            res.json({'success':false,'msg':"delete failure"});
        }
    });
}
exports.findAllEnable = function (req, res) {
    Category.findAllEnable(function(err,docs){
        res.render("manager/Category",{docs:docs,title:"Category List"});
    });
}

var findByName = function (name, callback) {
    Category.findByName(name, function (err, obj) {
        callback(err, obj);
    });
};
//add
exports.add = function (req, res) {
    var name = req.body.name.trim();
    var msg = "";
    var success = false;
    var falg = false;//callback
    if (name == "") {
        msg = "Category Name is empty";
    } else {
        flag = true;
        findByName(name, function (err, obj) {
            if (obj != null) {
                msg = "Category Name is exists";
                res.json({'success': success, 'msg': msg});
            } else {
                obj = {"name": name, "createTime": new Date(), "modifyTime": new Date()};
                Category.save(obj, function (err) {
                    if (!err) {
                        success = true;
                        msg = "Add Category is success";
                    } else {
                        console.log(err.message);
                        msg = "Add Category is failure";
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
//update
exports.update = function (req, res) {
    var id = req.body.id;
    var name = req.body.name.trim();
    var msg = "";
    var success = false;
    var falg = false;//callback
    if (name == "") {
        msg = "Category Name is empty";
    } else {
        flag = true;
        findByName(name, function (err, obj) {
            if (obj != null) {
                msg = "Category Name is exists";
                res.json({'success': success, 'msg': msg});
            } else {
                Category.update(id,name, function (err) {
                    if (!err) {
                        success = true;
                        msg = "Modify Category is success";
                    } else {
                        console.log(err.message);
                        msg = "Modify Category is failure";
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

//login
exports.login = function (req, res) {
    var CategoryName = util.trim(req.body.CategoryName);
    var password = util.trim(req.body.password);
    var msg = "";
    var success = false;
    var falg = false;//callback
    if (CategoryName == "") {
        msg = "CategoryName is empty";
    } else if (password == "") {
        msg = "password is empty";
    } else {
        flag = true;
        findCategoryByName(CategoryName, function (err, obj) {
            if(obj.status==1){
                obj=null;
            }
            if (obj != null) {
                if (obj.password == password) {//success
                    success = true;
                    msg = "sign in success";
                    var session = req.session;
                    req.session.Category = obj;
                } else {
                    msg = "password is error";
                }
            } else {
                msg = "CategoryName is not exists";
            }
            res.json({'success': success, 'msg': msg, 'obj': obj});
        });

    }
    if (!flag) {// no callback
        res.json({'success': success, 'msg': msg});
    }
};

