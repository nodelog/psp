var Content = require('./../models/Content.js');
var User = require('./../models/User.js');
var Category = require('./../models/Category.js');
var util = require('./util.js');
var getCount = function (callback) {
    Content.getCount(function (err, total) {
        callback(err, total);
    });
};
var getCountByCategory = function (category, callback) {
    Content.getCountByCategory(category,function (err, total) {
        callback(err, total);
    });
};

exports.findByPage = function (req, res) {
    getCount(function (err, total) {
        var page = req.query.page;
        var totalPage = Math.ceil(total / 10);
        var login = false;
        if (req.query.login === "true") {
            login = true;
        }
        var view = "index";
        var title = "CMS HOME";
        if (req.query.manager === "true") {
            view = "manager/content";
            title = "Content Manager";
        }
        if (!err && total > 0) {
            page = page < 1 ? 1 : page == undefined ? 1 : page;
            page = page > totalPage ? totalPage : page;
            Content.findByPage(page, function (err, docs) {
                for (var i = 0; i < docs.length; i ++) {
                        var doc = docs[i];
                        console.log(doc.author);
                        User.findById(doc.author, function (err, obj) {
                            if (!err && obj != null) {
                                console.log(obj);
                                doc.userName = obj.userName;
                            } else {
                                console.log(doc.name + "'s user not found");
                                doc.userName = "UNKNOWN AUTHOR";//
                            }
                        });
                        Category.findById(doc.category, function (err, obj) {
                            if (!err && obj != null) {
                                console.log(obj);
                                doc.categoryName = obj.name;
                            } else {
                                console.log(doc.name + "'s user not found");
                                doc.categoryName = "UNKNOWN CATEGORY";//
                            }
                        });

                }
                res.render(view, {docs: docs, title: title, login: login, page: page, totalPage: totalPage});
            });
        } else {
            console.log("no data");
            res.render(view, {docs: {}, title: title, login: login, page: page, totalPage: totalPage});
        }
    });
}


exports.delete = function (req, res) {
    var id = req.body.id;
    Content.delete(id, function (err) {
        if (!err) {
            res.json({'success': true, 'msg': "delete success"});
        } else {
            res.json({'success': false, 'msg': "delete failure"});
        }
    });
}
exports.findAllEnable = function (req, res) {
    Content.findAllEnable(function (err, docs) {
        res.render("manager/Content", {docs: docs, title: "Content List"});
    });
}
exports.findById = function (req, res) {
    var id = req.query.id;
    var view = "contentDetail";
    if (req.query.manager === "true") {
        view = "manager/contentDetail";
    }
    Content.findById(id, function (err, doc) {
        if(!err){
            res.render(view, {doc: doc, title: "Content Detail"});
        }else{
            console.log("data err");
            res.redirect('/index');
        }

    });
}
exports.findByCategory = function (req, res) {
    var id = req.query.id;
    var name = req.query.name;
    var category = {id: id, name: name};
    getCountByCategory(category, function (err, total) {
        var page = req.query.page;
        var totalPage = Math.ceil(total / 10);
        if (!err && total > 0) {
            page = page < 1 ? 1 : page == undefined ? 1 : page;
            page = page > totalPage ? totalPage : page;
            Content.findByCategory(page,category, function (err, docs) {
                res.render("categoryContent", {docs: docs, title: name + " Content",  page: page, totalPage: totalPage});
            });
        } else {
            console.log("data error");
            res.render("categoryContent", {docs: {}, title: name + " Content",  page: page, totalPage: totalPage});
        }
    });

}

var findByName = function (name, callback) {
    Content.findByName(name, function (err, obj) {
        callback(err, obj);
    });
};
//add
exports.add = function (req, res) {
    var name = req.body.name.trim();
    var content = req.body.content;
    var category = req.body.category;
    var msg = "";
    var success = false;
    var falg = false;//callback
    if (name === "") {
        msg = "title is empty";
    } else if (content === "") {
        msg = "content is empty";
    } else {
        flag = true;
        findByName(name, function (err, obj) {
            if (obj !== null) {
                msg = "title is exists";
                res.json({'success': success, 'msg': msg});
            } else {
                var session = req.session;
                obj = {
                    "name": name,
                    "content": content,
                    "author": session.user._id,
                    "category": category
                };
                Content.save(obj, function (err) {
                    if (!err) {
                        success = true;
                        msg = "Add Content is success";
                        console.log("success");
                    } else {
                        console.log(err.message);
                        msg = "Add Content is failure";
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
        msg = "Content Name is empty";
    } else {
        flag = true;
        findByName(name, function (err, obj) {
            if (obj != null) {
                msg = "Content Name is exists";
                res.json({'success': success, 'msg': msg});
            } else {
                Content.update(id, name, function (err) {
                    if (!err) {
                        success = true;
                        msg = "Modify Content is success";
                    } else {
                        console.log(err.message);
                        msg = "Modify Content is failure";
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
    var ContentName = util.trim(req.body.ContentName);
    var password = util.trim(req.body.password);
    var msg = "";
    var success = false;
    var falg = false;//callback
    if (ContentName == "") {
        msg = "ContentName is empty";
    } else if (password == "") {
        msg = "password is empty";
    } else {
        flag = true;
        findContentByName(ContentName, function (err, obj) {
            if (obj.status == 1) {
                obj = null;
            }
            if (obj != null) {
                if (obj.password == password) {//success
                    success = true;
                    msg = "sign in success";
//                    var session = req.session;
//                    req.session.Content = obj;
                } else {
                    msg = "password is error";
                }
            } else {
                msg = "ContentName is not exists";
            }
            res.json({'success': success, 'msg': msg, 'obj': obj});
        });

    }
    if (!flag) {// no callback
        res.json({'success': success, 'msg': msg});
    }
};

