import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { router as loginRoute } from "./routes/login.js";
import { router as receipeRoute } from "./routes/reciepes.js";
import cors from "cors";
import "dotenv/config.js";

const app = express();
// app.use(config());
app.use(express.json());

// Server connect
app.listen(3007, () => {
  console.log(`I m listening on ${process.env.PORT}`);
});

// CORS Cross Orgin Resource Sharing
// app.options('/',
// cors({
//   origin: "http://localhost:5173",
//   credentials: true,
//   optionsSuccessStatus: 200,
//   methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
//   preflightContinue: false,
// })
// );

app.use(
  // Always use cors before the router or any other api calls
  cors({
    origin: process.env.CLIENT_PORT,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    preflightContinue: false,
  })
);

// app.use(function (req, res, next) {
//   //Enabling CORS
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
//     next();
//   });

// app.use(cors());

// route

app.use("/auth", loginRoute);

app.use("/reciepe", receipeRoute);
// Database Connection
// console.log(process.env.DB_PASS);
// const connection_string =
// process.env.CONNECTION_STRING;
// const connection_string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iajehm1.mongodb.net/cookbook?retryWrites=true&w=majority`;
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

// console.log(connection_string,process.env.PORT);
