const jwt=require("jsonwebtoken");
const User = require("../models/User");

const isAuthor=async (req,res,next)=>{
   try {
     const token=req.body.token || req.headers.authorization.split(' ')[1]
     console.log("headres: =>",req.headers)
     if(!token){
        return res.status(400).json({
            success:false,
            message:"token is not provided!!"
        })
     }
     const decodedToken=jwt.decode(token)
     const user=await User.findById(decodedToken.userId);

     if(user.accountType === "Author") next();
     
   } catch (error) {
    console.log("Error in authorizing the user");
    console.error(error)
    res.status(500).json({
        success:false,
        message:"Error in validating the token!!"
    })
   }
}

const isUser=async (req,res,next)=>{
   try {
     const token=req.body.token || req.headers.authorization;
     
     if(!token){
        return res.status(400).json({
            success:false,
            message:"token is not provided!!"
        })
     }
     const decodedToken=jwt.decode(token);
     if(decodedToken.role !== "Author") next();
   } catch (error) {
      console.log("Error in authorizing the user");
      console.error(error)
      res.status(500).json({
        success:false,
        message:"Unable to validate the token"
      })
   }
}

module.exports={
    isAuthor,
    isUser
}