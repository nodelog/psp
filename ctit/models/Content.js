var mongodb = require('./mongodb');
var constants = require('./constants');

var Schema = mongodb.mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ContentSchema = new Schema({
    name: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: ObjectId},
    category: {type: ObjectId},
    createTime: { type: Date, default: Date.now},
    modifyTime: {type: Date, default: Date.now},
    view: {type: Number, default: 1000},
    status: {type: 'Number', default: 0, required: true, min: 0, max: 1}
}, {
    collection: "content"
});

var ContentModel = mongodb.mongoose.model("Content", ContentSchema);
//
var ContentDAO = function () {
};
ContentDAO.prototype.save = function (obj, callback) {
    var ContentEntity = new ContentModel(obj);
    ContentEntity.save(function (err) {
        callback(err);
    });
};
ContentDAO.prototype.findByName = function (name, callback) {
    ContentModel.findOne({"name": name, "status": constants.CONTENT_ENABLE_STATUS}, function (err, obj) {
        callback(err, obj);
    });
};
ContentDAO.prototype.findById = function (id, callback) {
    ContentModel.findOne({"_id": id, "status": constants.CONTENT_ENABLE_STATUS}, function (err, obj) {
        callback(err, obj);
    });
};
ContentDAO.prototype.findByPage = function (page, callback) {
    var query = ContentModel.find({"status": constants.CONTENT_ENABLE_STATUS});
    query.sort({"modifyTime": -1});
    query.limit(constants.PER_PAGE_COUNT);
    query.skip((page - 1) * constants.PER_PAGE_COUNT);
    query.exec(function (err, docs) {
        callback(err, docs);
    });
};
ContentDAO.prototype.findByCategory = function (page, category, callback) {
    var query = ContentModel.find({"category": category, "status": constants.CONTENT_ENABLE_STATUS});
    query.sort({"modifyTime": -1});
    query.limit(constants.PER_PAGE_COUNT);
    query.skip((page - 1) * constants.PER_PAGE_COUNT);
    query.exec(function (err, docs) {
        callback(err, docs);
    });
};
ContentDAO.prototype.findByUser = function (page, author, callback) {
    var query = ContentModel.find({"author": author, "status": constants.CONTENT_ENABLE_STATUS});
    query.sort({"modifyTime": -1});
    query.limit(constants.PER_PAGE_COUNT);
    query.skip((page - 1) * constants.PER_PAGE_COUNT);
    query.exec(function (err, docs) {
        callback(err, docs);
    });
};
ContentDAO.prototype.getCount = function (callback) {
    ContentModel.count({"status": constants.CONTENT_ENABLE_STATUS}, function (err, total) {
        callback(err, total);
    });
};
ContentDAO.prototype.getCountByCategory = function (category, callback) {
    ContentModel.count({"category": category, "status": constants.CONTENT_ENABLE_STATUS}, function (err, total) {
        callback(err, total);
    });
};
ContentDAO.prototype.getCountByUser = function (author, callback) {
    ContentModel.count({"author": author, "status": constants.CONTENT_ENABLE_STATUS}, function (err, total) {
        callback(err, total);
    });
};
ContentDAO.prototype.delete = function (id, callback) {
    ContentModel.update({"_id": id}, {$set: {"status": constants.COMMENT_UNABLE_STATUS }}, function (err) {
        callback(err);
    });
};
ContentDAO.prototype.update = function (obj, callback) {
    ContentModel.update({"_id": obj.id}, {$set: {"name": obj.name, "content": obj.content, "category": obj.category, "modifyTime": new Date()}}, function (err) {
        callback(err);
    });
};
ContentDAO.prototype.addView = function (obj, callback) {
    ContentModel.update({"_id": obj.id}, {$set: {"view": (obj.view+1)}}, function (err) {
        callback(err);
    });
};
module.exports = new ContentDAO();