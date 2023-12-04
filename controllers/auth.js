//import user model
const User = require("../models/User");

//import bcrypt library to hash the passwords
const bcrypt=require("bcrypt");

//import jwt to generate tokens
const jwt=require("jsonwebtoken");

//signup controller
exports.signUp=async (req,res)=>{
    try {
        //extract all the fields from req.body
        const {name,email,password,confirmPassword,accountType}=req.body;

        //if any of the fields are empty return a response
        if(!name || !email || !password || !confirmPassword || !accountType){
            return res.status(400).json({
                success:false,
                message:"All the fields are mandatory.Please fill the missing feilds"
            })

            
        }

        //if passwords length do not match return a response
        if(password.length !== confirmPassword.length){
            return  res.status(400).json({
                success:false,
                message:"Passwords length do not match!!!"
            })
        }
        

        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Both passwords do not match!!"
            })
        }

        const user=await User.findOne({email:email});
        if(user){
            return res.status(409).json({
                success:false,
                message:"User already exists!!"
            })
        }
        
        //hash password and confirm password
        const hashedPassword=await bcrypt.hash(password,10)
        const hashConfirmPassword=await bcrypt.hash(confirmPassword,10)

        //create a user in user collection
        const newUser=new User({
            name:name,
            email:email,
            accountType:accountType,
            password:hashedPassword,
            confirmPassword:hashConfirmPassword,
        })

        const saveUser= (await newUser.save())

        res.status(201).json({
            success:true,
            data:saveUser,
            message:"Sucessfully created the account"
        })
        

    } catch (error) {
        console.log("Error in creating the user account -> ");
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Unable to create account.Please try again later"
        })
    }
}

exports.login=async (req,res)=>{
    try {
        //extract email and password from req.body
        const {email,password}=req.body;

        //if any of the feilds are absent return a response
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please provide all the empty fields!!"
            })
        }
        
        //find if user already exists
        const user=await User.findOne({email:email})
        
        //if user is not present return a response
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Your account does not exist please create an account!!"
            })
        }
        
        //compare if passwords are equal or not
        const result=await bcrypt.compare(password,user.password)

        //if they are equal generate token using json web token
        if(result){
            const token=jwt.sign({userId:user._id,role:user.accountType},process.env.SECRET_KEY,{
                algorithm:"HS512",
                expiresIn:"2h"
            })

           return res.status(200).json({
            success:true,
            data:token,
            message:"logged in sucessfully"
           }) 
        }
        
        //otherwise return a response
        res.status(400).json({
            success:false,
            message:"The password is invalid!!"
        })

    } catch (error) {
        console.errpr("Error in logging in the user")
        console.error(error)
        res.status(500).json({
            success:false,
            message:"Unable to login the user"
        })
    }
}