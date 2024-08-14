const mongoose=require("mongoose");
const validator=require("validator");
const userSchema=mongoose.Schema({
    email:{
        required:true,
        type:String,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:"Incorrect email format"
        }
    },
    password:{
        type:String,
        required:true,
        validate: {
            validator: function (v) {
              return v.length >= 6;
            },
            message: 'Password length should be greater than 6 characters',
          },
    },
    skill:{
        type:[String],
        default:[],
    },
    
});
const User=mongoose.model("User",userSchema);
module.exports=User;