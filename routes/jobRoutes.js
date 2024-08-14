const mongoose=require("mongoose");
const express=require("express");
const Job=require("../models/jobModel");
const User = require("../models/userModel");
const jobRoute=express.Router();
jobRoute.get("/searchJob/:searchText", async (req, res) => {
    try {
      console.log("inside search");
      const searchText = req.params.searchText;
      console.log(searchText);
  
      if (!searchText || searchText.length == 0) {
        return res.status(400).json({ error: "Enter text to search" });
      }
  
      const jobs = await Job.find({
        $or: [
          { title: { $regex: searchText, $options: "i" } },   // Search in title
          { skill: { $regex: searchText, $options: "i" } },  // Search in skill array
          { org: { $regex: searchText, $options: "i" } },   // Search in org field
        ],
      });
  
      res.status(200).json(jobs);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });
  
  
jobRoute.post("/postJob",async(req,res)=>{
    try{
        console.log("inside postjob");
        const {title,org,type,minSalary,maxSalary,description,skill,imageUrl,location}=req.body;
        var job=new Job({
            title,org,type,minSalary,maxSalary,description,skill,imageUrl,location,

        });
        console.log(job);
        await job.save();
        return res.status(200).json(job);
    }catch(err){
        res.status(500).json({"ERROR SD":err});
    }
});
jobRoute.get("/category/:type",async(req,res)=>{
    try {
        const category=req.params.type;
        // console.log(category);
        const jobs=await Job.find({"type":category});
        res.status(200).json(jobs);
        
    } catch (err) {
        res.status(500).json({error:err});        
    }
});

jobRoute.post("/featuredJob", async (req, res) => {
    try {
        console.log("FEATURED JOB");
        const { userId } = req.body;

        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ error: "userId not provided" });
        }

        // Fetch the user by ID and retrieve the skills
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const userSkill = user.skill;

        // Aggregation pipeline to find jobs that match the user's skills
        const jobs = await Job.aggregate([
            {
                $addFields: {
                    matchedSkillsCount: {
                        $size: {
                            $setIntersection: ["$skill", userSkill] // Find common skills
                        }
                    }
                }
            },
            {
                $sort: { matchedSkillsCount: -1 } // Sort by the number of matched skills
            },
            {
                $limit: 7 // Limit the result to top 7 jobs
            }
        ]);

        res.json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
jobRoute.get("/recentJob", async (req, res) => {
    try {
        console.log("INSIDE RECENT JOB");
      const jobs = await Job.find().sort({ createdAt: -1 }); // Sort jobs by creation time in descending order
      res.status(200).json(jobs);
    } catch (error) {
      res.status(400).json({ "error": error.message });
    }
  });
  




jobRoute.post("/setSkill",async(req,res)=>{
    try {
        console.log("Inside setskill");
        const {skill,userId}=req.body;
        console.log(skill);
        console.log(userId);
        const user=await User.findById(userId);
        if(!user) return res.status(500).json({error:"User doesnt exist"});
        user.skill=skill;
        await user.save();
        res.status(200).json({msg:"Skills Updated Successfully"});

        
    } catch (err) {
        res.status(500).json({error:err});
    }
});
jobRoute.get("/search/:userId",async(req,res)=>{
    try{
        console.log("Inside search job");
        const jobId=req.params.userId
        console.log(jobId);
        const job=await Job.findById(jobId);
        if(!job) return res.status(400).json({"error":"Job Not Found"});
        res.json(job);

    }catch(err){
        res.status(500).json({error:err});
    }
});


jobRoute.post('/hasApplied', async (req, res) => {
    try {
        const { userId, jobId } = req.body;
        if (!userId || !jobId) {
            return res.status(400).json({ error: 'userId and jobId are required' });
        }
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({ error: 'Job not found' });
        }
        const hasApplied = job.applicants.includes(userId);

        res.status(200).json(hasApplied );
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
jobRoute.post("/apply",async(req,res)=>{
    try {
        const { userId, jobId } = req.body;

        if (!userId || !jobId) {
            return res.status(400).json({ error: 'userId and jobId are required' });
        }

        // Find the job by jobId
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        // Check if the user has already applied
        if (job.applicants.includes(userId)) {
            return res.status(400).json({ error: 'User has already applied' });
        }

        // Add userId to the applicants array
        job.applicants.push(userId);
        const applyCount=job.applyCount;
        job.applyCount=applyCount+1;
        // Save the updated job document
        await job.save();

        res.status(200).json({ message: 'Application successful' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports=jobRoute;