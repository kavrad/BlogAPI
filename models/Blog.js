const mongoose=require("mongoose");

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true
    },
    blogImage:{
        type:String
    },
    author:String,
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
    timeStamp:{
        type:mongoose.Schema.Types.Date,
        default:Date.now()
    },

})

module.exports=mongoose.model("blog",blogSchema);