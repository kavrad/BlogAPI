const mongoose=require("mongoose");

const commentsSchema=new mongoose.Schema({
    comment:String
})

module.exports=mongoose.model("Comment",commentsSchema)