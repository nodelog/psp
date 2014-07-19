var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ContentSchema = new Schema({
    name: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: ObjectId},
    category: {type: ObjectId},
    createTime: { type: Date, default: Date.now},
    modifyTime: {type: Date, default: Date.now},
    view: {type: Number, default: 1000}
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
    ContentModel.findOne({name: name}, function (err, obj) {
        callback(err, obj);
    });
};
ContentDAO.prototype.findById = function (id, callback) {
    ContentModel.findOne({_id: id}, function (err, obj) {
        callback(err, obj);
    });
};
ContentDAO.prototype.findByPage = function (page, callback) {
    var query = ContentModel.find();
    query.sort({'_id': -1});
    query.limit(10);
    query.skip((page - 1) * 10);
    query.exec(function (err, docs) {
        callback(err, docs);
    });
};
ContentDAO.prototype.findByCategory = function (page, category, callback) {
    var query = ContentModel.find({category: {id: category.id, name: category.name}});
    query.sort({'_id': -1});
    query.limit(10);
    query.skip((page - 1) * 10);
    query.exec(function (err, docs) {
        callback(err, docs);
    });
};
ContentDAO.prototype.findAll = function (callback) {
    ContentModel.find({}, function (err, docs) {
        callback(err, docs);
    });
};
ContentDAO.prototype.findAllEnable = function (callback) {
    ContentModel.find({status: 0}, function (err, docs) {
        callback(err, docs);
    });
};
ContentDAO.prototype.getCount = function (callback) {
    ContentModel.count({}, function (err, total) {
        callback(err, total);
    });
};
ContentDAO.prototype.getCountByCategory = function (category, callback) {
//    console.log(new ObjectId());

    category = {id: new ObjectId(category.id), name: category.name};
    console.log(category);
    ContentModel.count({category: category}, function (err, total) {
        console.log("total:" + total);
        callback(err, total);
    });
};
ContentDAO.prototype.delete = function (id, callback) {
    ContentModel.remove({'_id': id}, function (err) {
        callback(err);
    });
};
ContentDAO.prototype.update = function (id, name, callback) {
    ContentModel.update({'_id': id}, {$set: {'name': name, 'modifyTime': new Date()}}, function (err) {
        callback(err);
    });
};
module.exports = new ContentDAO();