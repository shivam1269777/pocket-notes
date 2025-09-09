import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import dotenv from "dotenv";

dotenv.config();
const jwtAuth=async(req,res,next)=>{
    try{
        console.log("JWT middleware triggered ✅"); 
        
const token = req.headers.authorization?.split(" ")[1];

if(!token){
    return res.status(401).json({success:false,message:'Unauthorized'})
}
const payload=jwt.verify(token, process.env.JWT_SECRET)
if(!payload){
     return res.status(401).json({success:false,message:'Wrong token'})
}

const user =await User.findById(payload.id)
if(!user){
    return res.status(401).json({success:false,message:'No user'})
}
const newUser={name:user.name,id:user._id}
req.user=newUser;
 next();
    }catch(error){
 return res.status(401).json({success:false,message:'No user'})
    }
   
}

export default jwtAuth;