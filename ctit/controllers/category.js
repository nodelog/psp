var Category = require('./../models/Category.js');
var cmsUtils = require('./cmsUtils.js');
var getCount = function (callback) {
    Category.getCount(function (err, total) {
        callback(err, total);
    });
};
exports.findByPage = function (req, res) {
    getCount(function (err, total) {
        var pageObj = cmsUtils.page(req.query.page,total);
        var page = pageObj.page;
        var totalPage = pageObj.totalPage;
        if (!err && totalPage > 0) {
            Category.findByPage(page, function (err, docs) {
                res.render("manager/category", {docs: docs, title: "Category Manager", page: page, totalPage: totalPage});
            });
        } else {
            console.log("data error");
            res.render("manager/category", {docs: {}, title: "Category Manager", page: page, totalPage: totalPage});
        }
    });
}


exports.delete = function (req, res) {
    var id = req.body.id;
    Category.delete(id, function (err) {
        if (!err) {
            res.json({'success': true, 'msg': "delete success"});
        } else {
            res.json({'success': false, 'msg': "delete failure"});
        }
    });
}
exports.findAll = function (req, res) {
    Category.findAll(function (err, docs) {
        if (!err) {
            res.json({docs: docs});
        } else {
            console.log(err.message+"\n category load failure");
            res.json({docs:{}});
        }
//        var type = req.query.type;
//        if (type === "json") {
//            res.json({docs: docs});
//        } else {
//            if (!err) {
//                var view = req.query.view;
//                res.render(view, {docs: docs, title: view});
//            } else {
//                res.redirect("/index");
//            }
//        }
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
            if (obj != null && obj.name != name) {
                msg = "Category Name is exists";
                res.json({'success': success, 'msg': msg});
            } else {
                Category.update(id, name, function (err) {
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