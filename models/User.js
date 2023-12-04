//import mongoose
const mongoose=require("mongoose");

//define schema for users model
const usersSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    confirmPassword:{
        type:String,
       required:true,
       trim:true
    },
    accountType:{
        type:String,
        enum:["User","Author"],
        required:true
    },
    comment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    },
    blogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog"
    }]
})



//create users model via mongoose
module.exports=mongoose.model("User",usersSchema);