//import User model
const User = require("../models/User");

//import JWT Strategy
const JWTStrategy=require("passport-jwt").Strategy;
const ExtractJwT=require("passport-jwt").ExtractJwt;

//import dotenv library
require("dotenv").config();

let opts={};

opts.jwtFromRequest=ExtractJwT.fromAuthHeaderAsBearerToken() || ExtractJwT.fromBodyField("token")
opts.secretOrKey = process.env.SECRET_KEY

module.exports=function(passport){
    console.log("yes")
   
    passport.use(new JWTStrategy(opts,async (jwt_payload,done)=>{
        console.log(jwt_payload)
       try {
         const user=await User.findById(jwt_payload.userId);
         if(user){
            return done(null,user)
         }
         return done(null,false)
       } catch (error) {
        console.log("Error in validating the token");
        return done(error,false)
       }
    }))

}
