const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

const UserModel=mongoose.model("user",UserSchema)
module.exports=UserModel 