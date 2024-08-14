const express=require("express");
const db=require("./db");
const cors=require("cors");
const connectDB = require("./db");
require('dotenv').config();
var bodyParser = require('body-parser')

const authRoute=require("./routes/auth.js");
const jobRoute=require("./routes/jobRoutes");
const otpRoute=require("./routes/otpRoutes");
const app=express();
const PORT=process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true }));
connectDB();

app.use("/job",jobRoute);
app.use("/",authRoute);
app.use("/",otpRoute);

app.listen(PORT,()=>{
    console.log(`Running on PORT ${PORT}`);
});
module.exports = app;
