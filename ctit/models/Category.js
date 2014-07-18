var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var CategorySchema = new Schema({
    name: {type: 'String', required: true},
    createTime: { type: Date, default: Date.now},
    modifyTime: {type: Date, default: Date.now}
}, {
    collection: "category"
});

var CategoryModel = mongodb.mongoose.model("Category", CategorySchema);
//
var CategoryDAO = function () {
};
CategoryDAO.prototype.save = function (obj, callback) {
    var categoryEntity = new CategoryModel(obj);
    categoryEntity.save(function (err) {
        callback(err);
    });
};
CategoryDAO.prototype.findByName = function (name, callback) {
    CategoryModel.findOne({name: name}, function (err, obj) {
        callback(err, obj);
    });
};
CategoryDAO.prototype.findById = function (id, callback) {
    CategoryModel.findOne({_id: id}, function (err, obj) {
        callback(err, obj);
    });
};
CategoryDAO.prototype.findByPage = function (page, callback) {
    var query = CategoryModel.find();
    query.sort({'_id': -1});
    query.limit(10);
    query.skip((page - 1) * 10);
    query.exec(function (err, docs) {
        callback(err, docs);
    });
};
CategoryDAO.prototype.findAll = function (callback) {
    CategoryModel.find({}, function (err, docs) {
        callback(err, docs);
    });
};
CategoryDAO.prototype.findAllEnable = function (callback) {
    CategoryModel.find({status: 0}, function (err, docs) {
        callback(err, docs);
    });
};
CategoryDAO.prototype.getCount = function (callback) {
    CategoryModel.count({}, function (err, total) {
        callback(err, total);
    });
};
CategoryDAO.prototype.delete = function (id, callback) {
    CategoryModel.remove({'_id': id}, function (err) {
        callback(err);
    });
};
CategoryDAO.prototype.update = function (id, name, callback) {
    CategoryModel.update({'_id': id}, {$set: {'name': name, 'modifyTime': new Date()}}, function (err) {
        callback(err);
    });
};
module.exports = new CategoryDAO();