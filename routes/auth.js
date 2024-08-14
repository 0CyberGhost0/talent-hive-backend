const express=require("express");
const authRouter=express.Router();
const User=require("../models/userModel");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const mailer=require("../mailer/mailer");

const authMiddleWare=require("../middlewares/authMiddleware");
authRouter.post("/signup",async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email){
            res.statusCode(400).json({error:"Email cant be empty"});
        }
        if(!password){
            res.statusCode(400).json({error:"Enter Password"});
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(500).json({error:"User already exists."});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const user=User({
            email,
            password:hashedPassword,
        });
        await user.save();

        res.status(200).json({msg:"Account Created Successfully",...user._doc});


    }catch(err){
        res.status(500).json({error:err.message});
    }
});
authRouter.post("/login",async (req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email){
            return res.status(400).json({error:"Email cant be empty"});
        }
        if(!password){
            return res.status(400).json({error:"Enter Password"});
        }
        const user=await User.findOne({email});
        const samePassword=await bcrypt.compare(password,user.password);
        if(!user){
            return res.status(400).json({error:"User not found with this email"});
        }
        if(!samePassword) return res.status(400).json({error:"Incorrect Password"});
        const token=jwt.sign({id:user._id},"jwtPassword");
        res.status(200).json({...user._doc,token});  
    } catch (err) {
        res.status(500).json({error:err.message});
        
    }
});
authRouter.post("/tokenIsValid", async (req,res)=>{
    try {
        console.log("Inside TokenValid");
        const token=req.header("x-auth-token");
        if(!token) return res.json(false);
        const verified=jwt.verify(token,"jwtPassword");
        if(!verified) return res.json(false);
        const user=await User.findById(verified.id);
        if(!user) return res.json(false);
        return res.json(true);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});
authRouter.get("/",authMiddleWare,async(req,res)=>{
    try {
        const userId=req.user;
        const user=await User.findById(userId);
        console.log(req.token);
        res.status(200).json({...user._doc,token:req.token});
    } catch (error) {
        res.statusCode(500).json({error:error.message});
    }
})
module.exports=authRouter;