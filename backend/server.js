import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { router as loginRoute } from "./routes/login.js";
import cors from 'cors';

const app = express();
app.use(express.json());

// Server connect
app.listen(3007, () => {
  console.log("I m listening");
});

//route
app.use("/auth", loginRoute);

// CORS Cross Orgin Resource Sharing 
app.use(cors({
  origin:'http://localhost:5173',
}));

// Database Connection
const connection_string =
  "mongodb+srv://hazerdevops:DevHazerOps1007@cluster0.iajehm1.mongodb.net/cookbook?retryWrites=true&w=majority";
mongoose
  .connect(connection_string)
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => {
    console.error(err);
  });

// console.log(process.env.CONNECTION_STRING);
