import express from 'express';
import Note from '../models/Note.js'
import jwtAuth from '../middleware/jwtAuth.js';
const router=express.Router()


router.post('/add',jwtAuth,async(req,res)=>{
 try{
        const {title,description}=req.body;
const newNote=new Note({
    title,
    description,
    userId:req.user.id
})
await newNote.save();
return res.status(200).json({
    success:true,message:"Note added Successfully"
})
    }catch(error){
        return res.status(500).json({success:false,message:"Error in adding new Note"});
    }
})
router.get('/',jwtAuth,async(req,res)=>{
    try{
const notes=await Note.find({userId:req.user.id})
return res.status(200).json({success:true,notes})
    }catch(error){
        res.status(500).json({success:false,message:"can't retrive notes"})
    }
})

router.put("/:id",jwtAuth,async(req,res)=>{
    try{
const {id}=req.params;
const updateNote=await Note.findByIdAndUpdate(id,req.body)
   return res.status(200).json({success:true,updateNote}) }catch(error){
    res.status(500).json({success:false,message:"can't update  notes"})
   }
})

router.delete("/:id",jwtAuth,async(req,res)=>{
    try{
const {id}=req.params;
const updateNote=await Note.findByIdAndDelete(id,req.body)
   return res.status(200).json({success:true,updateNote}) }catch(error){
    res.status(500).json({success:false,message:"can't delete notes"})
   }
})

export default router;