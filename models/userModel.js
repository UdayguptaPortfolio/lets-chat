const{model,Schema}=require('mongoose');

const userSchema=new Schema({
    username:{
        type:String,
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    createdAt:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=model('user_details',userSchema);
