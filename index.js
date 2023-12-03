//import express
const express=require("express");

//import dotenv
require("dotenv").config();

//function to connect server to db
const {dbConnect}=require("./config/mongoose");

//initialize port
const port=process.env.PORT || 5000

//initialize the server using express
const app=express();

//Connection to db via mongoose
await dbConnect();

//listening the server n a particular port
app.listen(port,(error)=>{
   if(error){
    throw error
   }

   console.log("Server running sucessfully on port:",port)
})