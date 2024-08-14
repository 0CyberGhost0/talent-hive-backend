const express=require("express");
const mongoose=require("mongoose");
const MONGO_URL="mongodb+srv://ved:admin@talenthive.lvzpxrj.mongodb.net/?retryWrites=true&w=majority&appName=talentHive";
const connectDB= async()=>{
     mongoose.connect(MONGO_URL).then(()=>{
    console.log("database connected");
}).catch((error)=>{
    console.log(error);
});
}
module.exports=connectDB;