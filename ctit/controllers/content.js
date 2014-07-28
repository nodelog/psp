var async = require("async");
var utils = require("util");
var Content = require('./../models/Content.js');
var User = require('./../models/User.js');
var Category = require('./../models/Category.js');
var cmsUtils = require('./cmsUtils.js');
var getCount = function (callback) {
    Content.getCount(function (err, total) {
        callback(err, total);
    });
};
var getCountByCategory = function (category, callback) {
    Content.getCountByCategory(category, function (err, total) {
        callback(err, total);
    });
};
var getCountByUser = function (author, callback) {
    Content.getCountByUser(author, function (err, total) {
        callback(err, total);
    });
};

exports.findByPage = function (req, res) {
    var total = 0, page = 0, totalPage = 0, docs = {};
    async.auto({
        totalCount: function (callback, results) {
            getCount(function (err, count) {
                total = count;
                callback(null);
            });
        },
        pageDocs: ["totalCount", function (callback, results) {
            var pageObj = cmsUtils.page(req.query.page, total);
            page = pageObj.page;
            totalPage = pageObj.totalPage;
            console.log(page + "page");
            console.log(totalPage + "totalpage");
            if (totalPage > 0) {
                Content.findByPage(page, function (err, objects) {
                    docs = objects;
                    callback(null);
                });
            } else {
                callback(null);
            }
        }],
        initUser: ["pageDocs", function (callback, results) {
            var count = 0;
            async.whilst(//sync floor
                function () {
                    return count < docs.length
                },
                function (callbackThis) {
                    var doc = docs[count];
                    User.findById(doc.author, function (err, obj) {
                        if (obj != null) {
                            doc.userName = obj.userName;
                        } else {
                            console.log(doc.name + "'s user not found");
                            doc.userName = "UNKNOWN AUTHOR";//
                        }
                        count++;
                        callbackThis();
                    });
                },
                function (err) {
                    callback(err);
                }
            );
        }],
        initCategory: ["initUser", function (callback, results) {
            var count = 0;
            async.whilst(//sync floor
                function () {
                    return count < docs.length;
                },
                function (callbackThis) {
                    var doc = docs[count];
                    Category.findById(doc.category, function (err, obj) {
                        if (obj != null) {
                            doc.categoryName = obj.name;
                        } else {
                            console.log(doc.name + "'s user not found");
                            doc.categoryName = "UNKNOWN CATEGORY";//
                        }
                        count++;
                        callbackThis();
                    });
                },
                function (err) {
                    callback(err);
                }
            );
        }]
    }, function (err, results) {
        var login = false;
        if (req.query.login === "true") {
            login = true;
        }
        var view = "index";
        var title = "NODELOG";
        if (req.query.manager === "true") {
            view = "manager/content";
            title = "Content Manager";
        }
        res.render(view, {docs: docs, title: title, login: login, page: page, totalPage: totalPage, total: total});
    });

};


exports.delete = function (req, res) {
    var id = req.body.id;
    Content.delete(id, function (err) {
        if (!err) {
            res.json({'success': true, 'msg': "delete success"});
        } else {
            res.json({'success': false, 'msg': "delete failure"});
        }
    });
};
exports.findById = function (req, res) {
    var id = req.query.id;
    var view = req.query.view;
    var doc = null;
    async.auto({
        getContent: function (callback, results) {
            Content.findById(id, function (err, obj) {
                if (!err) {
                    doc = obj;
                } else {
                    console.log("data err");
                }
                callback(null);
            });
        },
        initUser: ["getContent", function (callback, results) {
            if (doc != null) {
                User.findById(doc.author, function (err, obj) {
                    if (obj != null) {
                        doc.userName = obj.userName;
                    } else {
                        console.log(doc.name + "'s user not found");
                        doc.userName = "UNKNOWN AUTHOR";//
                    }
                    callback(null);
                });
            } else {
                callback(null);
            }
        }],
        initCategory: ["initUser", function (callback, results) {
            if (doc != null) {
                Category.findById(doc.category, function (err, obj) {
                    if (obj != null) {
                        doc.categoryName = obj.name;
                    } else {
                        console.log(doc.name + "'s user not found");
                        doc.categoryName = "UNKNOWN CATEGORY";//
                    }
                    callback(null);
                });
            } else {
                callback(null);
            }
        }]
    }, function (err, results) {
        if (view == "editContent") {
            if (req.session.user._id != doc.author) {
                res.redirect("/");
            }
        }
        if (view == "contentDetail") {
            Content.addView(doc, function (err) {
                if (err) {
                    console.log("add view failure");
                }else{
                    doc.view = (doc.view+1);
                }
                res.render(view, {"doc": doc, "title": doc != null ? doc.name : "Content not found"});
            });
        } else {
            res.render(view, {"doc": doc, "title": doc != null ? doc.name : "Content not found"});
        }

    });
};
exports.findByCategory = function (req, res) {
    var category = {}, total = 0, page = 0, totalPage = 0, docs = {};
    async.auto({
        getCategoryById: function (callback, results) {
            var categoryId = req.query.categoryId;
            Category.findById(categoryId, function (err, obj) {
                category = obj;
                callback(null);
            });
        },
        totalCount: ["getCategoryById", function (callback, results) {
            getCountByCategory(category._id, function (err, count) {
                total = count;
                callback(null);
            });
        }],
        getContentByPage: ["totalCount", function (callback, results) {
            var pageObj = cmsUtils.page(req.query.page, total);
            page = pageObj.page;
            totalPage = pageObj.totalPage;
            if (totalPage > 0) {
                Content.findByCategory(page, category._id, function (err, objects) {
                    docs = objects;
                    callback(null);
                });
            } else {
                console.log("data error");
                callback(null);
            }
        }],
        initUser: ["getContentByPage", function (callback, results) {
            var count = 0;
            async.whilst(//sync floor
                function () {
                    return count < docs.length
                },
                function (callbackThis) {
                    var doc = docs[count];
                    User.findById(doc.author, function (err, obj) {
                        if (obj != null) {
                            doc.userName = obj.userName;
                        } else {
                            console.log(doc.name + "'s user not found");
                            doc.userName = "UNKNOWN AUTHOR";//
                        }
                        count++;
                        callbackThis();
                    });
                },
                function (err) {
                    callback(err);
                }
            );
        }],
        initCategory: ["initUser", function (callback, results) {
            for (var i = 0; i < docs.length; i++) {
                docs[i].categoryName = category.name;
            }
            callback(null);
        }]
    }, function (err, results) {
        res.render("categoryContent", {docs: docs, category: category, title: category.name + " Contents", page: page, totalPage: totalPage, total: total});
    });
};
exports.findByUser = function (req, res) {
    var user = null, total = 0, page = 0, totalPage = 0, docs = {};
    async.auto({
        getUserById: function (callback, results) {
            var userId = req.query.userId;
            var session = req.session;
            if (userId == null && session != null) {
                userId = session.user._id;
            }
            if (userId != null) {
                User.findById(userId, function (err, obj) {
                    user = obj;
                    callback(null);
                });
            } else {
                callback(null);
            }
        },
        totalCount: ["getUserById", function (callback, results) {
            if (user != null) {
                getCountByUser(user._id, function (err, count) {
                    total = count;
                    callback(null);
                });
            } else {
                callback(null);
            }
        }],
        getContentByPage: ["totalCount", function (callback, results) {
            var pageObj = cmsUtils.page(req.query.page, total);
            page = pageObj.page;
            totalPage = pageObj.totalPage;
            if (totalPage > 0) {
                Content.findByUser(page, user._id, function (err, objects) {
                    docs = objects;
                    callback(null);
                });
            } else {
                console.log("data error");
                callback(null);
            }
        }],
        initUser: ["getContentByPage", function (callback, results) {
            for (var i = 0; i < docs.length; i++) {
                docs[i].userName = user.userName;
            }
            callback(null);
        }],
        initCategory: ["initUser", function (callback, results) {
            var count = 0;
            async.whilst(//sync floor
                function () {
                    return count < docs.length;
                },
                function (callbackThis) {
                    var doc = docs[count];
                    Category.findById(doc.category, function (err, obj) {
                        if (obj != null) {
                            doc.categoryName = obj.name;
                        } else {
                            console.log(doc.name + "'s user not found");
                            doc.categoryName = "UNKNOWN CATEGORY";//
                        }
                        count++;
                        callbackThis();
                    });
                },
                function (err) {
                    callback(err);
                }
            );
        }]
    }, function (err, results) {
        var view = "myContent";
        var title = user.userName + "\'s Contents";
        if (req.query.manager === "true") {
            view = "manager/content";
            title = "Content Manager";
        }
        res.render(view, {docs: docs, title: title, page: page, totalPage: totalPage, total: total});
    });
};

var findByName = function (name, callback) {
    Content.findByName(name, function (err, obj) {
        callback(err, obj);
    });
};
//add
exports.add = function (req, res) {
    var id = req.body.id;
    var name = req.body.name.trim();
    var oldName = req.body.oldName;
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
            if (id == null) {//add
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
                        } else {
                            console.log(err.message);
                            msg = "Add Content is failure";
                        }
                        res.json({'success': success, 'msg': msg});
                    });
                }
            } else {//update
                if (obj !== null && obj.name != oldName) {
                    msg = "title is exists";
                    res.json({'success': success, 'msg': msg});
                } else {
                    obj = {
                        "id": id,
                        "name": name,
                        "content": content,
                        "category": category
                    };
                    Content.update(obj, function (err) {
                        if (!err) {
                            success = true;
                            msg = "Edit Content is success";
                            console.log("success");
                        } else {
                            console.log(err.message);
                            msg = "Edit Content is failure";
                        }
                        res.json({'success': success, 'msg': msg, 'id': obj.id});
                    });
                }
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

//exports.findByManager = function (req, res) {
//
//}

