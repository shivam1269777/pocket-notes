import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectMongoDb=async ()=> {
  await mongoose.connect(process.env.MONGO_URI);}

connectMongoDb().then(()=>{console.log("now connection is establish")}).catch(err => console.log(err));

export default connectMongoDb;