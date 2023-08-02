import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { router as loginRoute } from './routes/login.js';

const app=express();
app.use(express.json());

// Server connect
app.listen(3000,()=>{
    console.log("I m listening");
})

//route
app.use("/auth",loginRoute);

// Database Connection
const connection_string="mongodb+srv://hazerdevops:DevHazerOps1007@cluster0.iajehm1.mongodb.net/cluster0?retryWrites=true&w=majority"
mongoose.connect(connection_string).then(()=>{
    console.log("Successfully connected to database");
})
.catch((err)=>{
    console.error(err);
})

// console.log(process.env.CONNECTION_STRING);