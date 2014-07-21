var async = require("async");
var utils = require("util");
var Comment = require('./../models/Comment.js');
var Content = require('./../models/Content.js');
var User = require('./../models/User.js');
var util = require('./util.js');
var getCount = function (callback) {
    Comment.getCount(function (err, total) {
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
            page = req.query.page;
            totalPage = Math.ceil(total / 10);
            if (totalPage > 0) {
                page = page < 1 ? 1 : page == undefined ? 1 : page;
                page = page > totalPage ? totalPage : page;
                Comment.findByPage(page, function (err, objects) {
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
                        console.log(doc.category + "\t category in Comment .js ");
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
        var title = "CMS HOME";
        if (req.query.manager === "true") {
            view = "manager/Comment";
            title = "Comment Manager";
        }
        res.render(view, {docs: docs, title: title, login: login, page: page, totalPage: totalPage});
    });

};


exports.delete = function (req, res) {
    var id = req.body.id;
    Comment.delete(id, function (err) {
        if (!err) {
            res.json({'success': true, 'msg': "delete success"});
        } else {
            res.json({'success': false, 'msg': "delete failure"});
        }
    });
};
exports.findAllEnable = function (req, res) {
    Comment.findAllEnable(function (err, docs) {
        res.render("manager/Comment", {docs: docs, title: "Comment List"});
    });
};
exports.findById = function (req, res) {
    var id = req.query.id;
    var view = req.query.view;
    var doc = null;
    async.auto({
        getComment: function (callback, results) {
            Comment.findById(id, function (err, obj) {
                if (!err) {
                    doc = obj;
                } else {
                    console.log("data err");
                }
                callback(null);
            });
        },
        initUser: ["getComment", function (callback, results) {
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
        res.render(view, {doc: doc, title: doc != null ? doc.name : "Comment not found"});
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
        getCommentByPage: ["totalCount", function (callback, results) {
            page = req.query.page;
            totalPage = Math.ceil(total / 10);
            if (total > 0) {
                page = page < 1 ? 1 : page == undefined ? 1 : page;
                page = page > totalPage ? totalPage : page;
                Comment.findByCategory(page, category._id, function (err, objects) {
                    docs = objects;
                    callback(null);
                });
            } else {
                console.log("data error");
                callback(null);
            }
        }],
        initUser: ["getCommentByPage", function (callback, results) {
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
                        console.log(doc.category + "\t category in Comment .js ");
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
        res.render("categoryComment", {docs: docs, category: category, title: category.name + " Comments", page: page, totalPage: totalPage});
    });
};

var findByName = function (name, callback) {
    Comment.findByName(name, function (err, obj) {
        callback(err, obj);
    });
};
//add
exports.add = function (req, res) {
    var id = req.body.id;
    var contentId = req.body.contentId;
    var comment = req.body.comment.trim();
    var msg = "";
    var success = false;
    var falg = false;//callback
    if (comment === "") {
        msg = "comment content is empty";
    } else {
        flag = true;
        if (id == null) {//add
            var session = req.session;
            var obj = {
                "comment": comment,
                "commenter":session.user._id,
                "content": contentId
            };
            Comment.save(obj, function (err) {
                if (!err) {
                    success = true;
                    msg = "Add Comment is success";
                } else {
                    console.log(err.message);
                    msg = "Add Comment is failure";
                }
                res.json({'success': success, 'msg': msg});
            });
        } else {//update
                var obj = {
                    "id": id,
                    "comment": comment
                };
                Comment.update(obj, function (err) {
                    if (!err) {
                        success = true;
                        msg = "Edit Comment is success";
                        console.log("success");
                    } else {
                        console.log(err.message);
                        msg = "Edit Comment is failure";
                    }
                    res.json({'success': success, 'msg': msg, 'id': obj.id});
                });
        }
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
        msg = "Comment Name is empty";
    } else {
        flag = true;
        findByName(name, function (err, obj) {
            if (obj != null) {
                msg = "Comment Name is exists";
                res.json({'success': success, 'msg': msg});
            } else {
                Comment.update(id, name, function (err) {
                    if (!err) {
                        success = true;
                        msg = "Modify Comment is success";
                    } else {
                        console.log(err.message);
                        msg = "Modify Comment is failure";
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
    var CommentName = util.trim(req.body.CommentName);
    var password = util.trim(req.body.password);
    var msg = "";
    var success = false;
    var falg = false;//callback
    if (CommentName == "") {
        msg = "CommentName is empty";
    } else if (password == "") {
        msg = "password is empty";
    } else {
        flag = true;
        findCommentByName(CommentName, function (err, obj) {
            if (obj.status == 1) {
                obj = null;
            }
            if (obj != null) {
                if (obj.password == password) {//success
                    success = true;
                    msg = "sign in success";
//                    var session = req.session;
//                    req.session.Comment = obj;
                } else {
                    msg = "password is error";
                }
            } else {
                msg = "CommentName is not exists";
            }
            res.json({'success': success, 'msg': msg, 'obj': obj});
        });

    }
    if (!flag) {// no callback
        res.json({'success': success, 'msg': msg});
    }
};

