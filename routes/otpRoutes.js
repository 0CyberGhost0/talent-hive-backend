const express=require("express");
var randomize=require("randomatic");
const otpRoutes=express.Router();
const sendMail=require("../mailer/mailer");
const OTP=require("../models/otpModel");
const User = require("../models/userModel");
const { OperationCanceledException } = require("typescript");
function generateOTP(length = 5) {
    return randomize('0',length);
}
otpRoutes.post("/getOtp",async (req,res)=>{
    try {
        const {email}=req.body;
        const user=await User.findOne({email:email});
        if(!user) return res.status(500).json({error:"User doesnt exist"});
        const otp=generateOTP();
        const htmlMessage = `
  <div style="width: 100%; padding: 20px; box-sizing: border-box; background-color: #f4f4f4; font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #333; text-align: center;">Welcome to Talent Hive</h1>
      <p style="font-size: 16px; color: #555; text-align: center;">Dear User,</p>
      <p style="font-size: 16px; color: #555; text-align: center;">Thank you for signing up with Talent Hive. Your account has been created successfully.</p>
      <p style="font-size: 16px; color: #555; text-align: center;">Please use the following OTP to verify your email address:</p>
      <div style="text-align: center; margin: 20px 0;">
        <h2 style="font-size: 36px; color: #e74c3c; margin: 0;">${otp}</h2>
      </div>
      <p style="font-size: 16px; color: #555; text-align: center;">This OTP is valid for 10 minutes.</p>
      <p style="font-size: 14px; color: #777; text-align: center;">If you did not request this, please ignore this email.</p>
      <p style="font-size: 16px; color: #555; text-align: center;">Best regards,<br/>Talent Hive Team</p>
    </div>
  </div>
`;
        const newOtp=new OTP({
            otp,
            email,
        });
        await newOtp.save();
        console.log(otp);
        await sendMail(email,"Welcome to Talent Hive: Your Account Has Been Successfully Created",htmlMessage);
        res.status(200).json({msg:"Email Sent Successfully"});
    } catch (err) {
        console.log(err);        
    }
});
otpRoutes.post("/verifyOtp",async (req,res)=>{
    try {
        console.log("INSIDE VERIFY OTP");
        const {email,otp}=req.body;
        if(!otp) return res.status(500).json({error:"Enter OTP!"});
        const existingOTP=await OTP.findOne({"email":email});
        if(!existingOTP) return res.status(500).json({error:"User doesn't exist"});
        if(existingOTP.expiresAt<Date.now()) return res.status(500).json({error:"OTP expired"});
        if(existingOTP.otp!= otp) return res.status(500).json({error:"Invalid OTP"});
        await OTP.deleteOne({"email":email});
        console.log(otp);
        res.status(200).json({msg:"Successfully Verified"});
    } catch (err) {
        console.log(err);        
    }
});
module.exports=otpRoutes;