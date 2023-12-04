//import express
const express=require("express");

//import dotenv
require("dotenv").config();

//function to connect server to db
const {dbConnect}=require("./config/mongoose");

//auth routes
const authRoutes=require("./routes/auth");

//import passport middleware
const passport=require("passport");

//import blogpost routes
const postRoutes=require("./routes/post")

//initialize port
const port=process.env.PORT || 5000

//initialize the server using express
const app=express();

//Connection to db via mongoose
dbConnect();

//middleware to parse request body
app.use(express.json());

//initialize passport middleware
app.use(passport.initialize())

app.use("/api/v1/auth",authRoutes);

app.use("/api/v1/posts",postRoutes);

//listening the server n a particular port
app.listen(port,(error)=>{
   if(error){
    throw error
   }

   console.log("Server running sucessfully on port:",port)
})