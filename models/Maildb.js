var mongoose = require('mongoose');
mongoose.connect("mongodb+srv://RudhramSaraswat:Omjaisairam@1234@rudhramrudhram.oft9r.mongodb.net/?retryWrites=true&w=majority",{ useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology:true,useFindAndModify:false });
mongoose.Promise=global.Promise;

var MailSchema=mongoose.Schema({
    emailid:{
        type:String
    },
    subject:{
        type:String
    },
    status:{
        type:String
    },
    date:{
        type:Date
    }
});

var Mail=module.exports=mongoose.model('Mail_Log',MailSchema,'Mail_Log');
Mail.mail_log=function(mail_doc,callback){
    mail_doc.save(callback);
}

Mail.find_mail=function(callback){
    Mail.find(callback).sort({date:-1});

}

