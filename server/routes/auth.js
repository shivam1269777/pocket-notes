import express  from "express";
import User from "../models/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router=express.Router()
router.post("/register",async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const user=await User.findOne({email});
        if(user){
           return res.status(409).json({success:false,message:"User already exist",alreadyExist: true})
        }
        const hash=await bcrypt.hash(password,10);
const newUser=new User({
    name:name,
    email:email,
    password:hash,
})
await newUser.save();
return res.status(200).json({
    success:true,message:"User is registered Successfully"
})
    }catch(error){
        return res.status(500).json({success:false,message:"Error in adding new user"});
    }
})


router.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
           return res.status(401).json({success:false,message:"User Not Found"})
        }
const comparePassword=await bcrypt.compare(password,user.password);
if(!comparePassword){
     return res.status(401).json({success:false,message:"wrong password"})
}
const token=jwt.sign({id:user._id,name: user.name }, process.env.JWT_SECRET,{expiresIn:"5h"})
return res.status(200).json({
    success:true,message:"Login Successfully",token,user:{name:user.name,email:user.email}
})
    }catch(error){
        return res.status(500).json({success:false,message:"Error in login"});
    }
})
export default router;