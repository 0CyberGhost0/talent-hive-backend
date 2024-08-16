const mongoose=require("mongoose");
const jobSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    org:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    minSalary:{
        type:Number,
        required:true,
    },
    maxSalary:{
        type:Number,
        required:true,
    },
    type:{
        type:String,
        enum:['Remote','Full Time','Part Time','Contract'],
        required:true,
    },
    skill:{
        type:[String],
        required: true,
    },
    applyCount:{
        type:Number,
        default:0,
    },
    applicants:{
        type:[String],
        default:[],
    },
    location:{
        type:String,
        required:true,
    },
    randomNum:{
        type:Number,
        required:true,
        default:1,
    },
    
},{timestamps:true});
const Jobs=mongoose.model("Job",jobSchema);
module.exports=Jobs;