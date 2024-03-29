var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect("mongodb+srv://RudhramSaraswat:Omjaisairam@1234@rudhramrudhram.oft9r.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology:true,useFindAndModify:false });
mongoose.Promise=global.Promise;
//var db = mongoose.connection;

var StaffSchema = mongoose.Schema({
    emailid: {
        type: String,
        index: true
    },
    rand:{
type:Number
    },
    status:{
     type:String
    },
    access:{
        type:String,
        default:'pending'
    },
    gender:{
        type: String,
    },
    dep:{
      type: String
    },
    Desig:{
        type:String
    },
    mobileno:{
        type:String
    },

    password: {
        type: String
    },
    id: {
        type: String
    },
    name: {
        type: String
    }
});

var Staff = module.exports = mongoose.model('Staff',StaffSchema,'Staff');


 

module.exports.getUserByID = function(id, callback){
    var query = (id.indexOf('@') === -1) ? {mobileno: id} : {emailid: id};
;
    Staff.findOne(query, callback);
}
module.exports.updateuser = function(id,newvalues, callback){
    var id = (id.indexOf('@') === -1) ? {mobileno: id} : {emailid: id};
    //var query={_id:id}; 
    Staff.updateOne(id, newvalues,callback);
 }
 module.exports.update_password = function(id,password, callback){
    var id= (id.indexOf('@') === -1) ? {_id: id} : {emailid: id};
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
               var query={password:hash};
            Staff.updateOne(id, query,callback);
        });
    });
   
}
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        callback(null, isMatch);
    });
}
Staff.apprv_find=function(query,callback)
{
 
    Staff.find({$and:[{status:'verified'},{access:query}]},callback);
}
module.exports.getinfobyID = function(id, callback){
   var query = (id.indexOf('@') === -1) ? {_id: id} : {emailid: id}; 
   Staff.findOne(query, callback);
}
module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
    
}
