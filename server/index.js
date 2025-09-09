import express from "express"
import cors from 'cors'
import authRouter from "./routes/auth.js"
import noteRouter from "./routes/note.js"
import connectMongoDb from "./DataBase/db.js"
import dotenv from "dotenv";
import path from "path"
import history from 'connect-history-api-fallback';
dotenv.config();
const app=express()
const _dirname=path.resolve();
app.use(cors())
app.use(express.json())
app.use('/api/auth',authRouter);
app.use('/api/note',noteRouter)

app.use(history());
app.use(express.static(path.join(_dirname,"/vite-project/dist")))

app.get((_,res)=>{
    res.sendFile(path.resolve(_dirname,"vite-project","dist","index.html"))
})
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    connectMongoDb();
    console.log("server is running")})