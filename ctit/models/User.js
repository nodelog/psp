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
module.exports = new UserDAO();