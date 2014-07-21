var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
    comment: {type: String, required: true},
    commenter: {type: ObjectId},
    content: {type: ObjectId},
    createTime: { type: Date, default: Date.now},
    modifyTime: {type: Date, default: Date.now},
    status: {type: Number, default: 0}
}, {
    collection: "comment"
});

var CommentModel = mongodb.mongoose.model("Comment", CommentSchema);
//
var CommentDAO = function () {
};
CommentDAO.prototype.save = function (obj, callback) {
    var CommentEntity = new CommentModel(obj);
    CommentEntity.save(function (err) {
        callback(err);
    });
};
CommentDAO.prototype.findByName = function (name, callback) {
    CommentModel.findOne({name: name}, function (err, obj) {
        callback(err, obj);
    });
};
CommentDAO.prototype.findById = function (id, callback) {
    CommentModel.findOne({_id: id}, function (err, obj) {
        callback(err, obj);
    });
};
CommentDAO.prototype.findByPage = function (page, callback) {
    var query = CommentModel.find();
    query.sort({'_id': -1});
    query.limit(10);
    query.skip((page - 1) * 10);
    query.exec(function (err, docs) {
        callback(err, docs);
    });
};
CommentDAO.prototype.findByContent = function (page, content, callback) {
    var query = CommentModel.find({content: content});
    query.sort({'_id': -1});
    query.limit(10);
    query.skip((page - 1) * 10);
    query.exec(function (err, docs) {
        callback(err, docs);
    });
};
CommentDAO.prototype.findByCategory = function (page, category, callback) {
    var query = CommentModel.find({category: category});
    query.sort({'_id': -1});
    query.limit(10);
    query.skip((page - 1) * 10);
    query.exec(function (err, docs) {
        callback(err, docs);
    });
};
CommentDAO.prototype.findAll = function (callback) {
    CommentModel.find({}, function (err, docs) {
        callback(err, docs);
    });
};
CommentDAO.prototype.findAllEnable = function (callback) {
    CommentModel.find({status: 0}, function (err, docs) {
        callback(err, docs);
    });
};
CommentDAO.prototype.getCount = function (callback) {
    CommentModel.count({}, function (err, total) {
        callback(err, total);
    });
};
CommentDAO.prototype.getCountByContent = function (category, callback) {
    CommentModel.count({content: content}, function (err, total) {
        callback(err, total);
    });
};
CommentDAO.prototype.delete = function (id, callback) {
    CommentModel.remove({'_id': id}, function (err) {
        callback(err);
    });
};
CommentDAO.prototype.update = function (obj, callback) {
    CommentModel.update({'_id': obj.id}, {$set: {'comment': obj.comment, 'modifyTime': new Date()}}, function (err) {
        callback(err);
    });
};
module.exports = new CommentDAO();