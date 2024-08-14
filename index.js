const express=require("express");
const db=require("./db");
const cors=require("cors");
const connectDB = require("./db");
require('dotenv').config();
var bodyParser = require('body-parser')

const authRoute=require("./routes/auth.js");
const jobRoute=require("./routes/jobRoutes.js");
const otpRoute=require("./routes/otpRoutes.js");
const app=express();
const PORT=3000;
app.use(cors());
app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true }));
connectDB();
app.get("/",async(req,res)=>{
    res.status(200).json("Working");
});
app.use("/job",jobRoute);
app.use("/auth",authRoute);
app.use("/otp",otpRoute);

app.listen(PORT,()=>{
    console.log(`Running on PORT ${PORT}`);
});
module.exports = app;