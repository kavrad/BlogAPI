const mongoose=require("mongoose");

exports.dbConnect=async ()=>{
    try {
         await mongoose.connect(process.env.DB_CONNECTION,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }) 
        console.log("Sucessfully connected to db");
    } catch (error) {
        console.error("Error in connecting to db")
        console.error(error);
        process.exit(1);
    }
    
   
}

