var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var UserSchema = new Schema({
    userName : {type:'String',required:true},
    password  : {type:'String',required:true},
    createTime:{ type: Date, default: Date.now},
    modifyTime:{type:Date,default:Date.now},
    role:{type:'Number',required:true,min:0,max:1 },//0 super admin,1 normal user
    status:{type:'Number',required:true,min:0,max:1}//0 enable,1 disable
},{
    collection: "user"
});

var UserModel = mongodb.mongoose.model("User", UserSchema);
//
var UserDAO = function(){};
UserDAO.prototype.save = function(obj, callback) {
    var userEntity = new UserModel(obj);
    userEntity.save(function(err){
        callback(err);
    });
};
UserDAO.prototype.findByName= function(name, callback) {
    UserModel.findOne({userName:name}, function(err, obj){
        callback(err, obj);
    });
};
UserDAO.prototype.findByPage= function(page, callback) {
    var query = UserModel.find();
    query.limit(10);
    query.skip((page-1)*10);
    query.exec(function(err,docs){
        callback(err,docs);
    });
};
UserDAO.prototype.findAll= function(callback) {
    UserModel.find({},function(err,docs){
        callback(err,docs);
    });
};
UserDAO.prototype.getCount=function(callback){
    UserModel.count({}, function(err,total){
        callback(err,total);
    });
};
UserDAO.prototype.delete=function(id,callback){
    UserModel.remove({'_id':id}, function(err){
        callback(err);
    });
};
module.exports = new UserDAO();