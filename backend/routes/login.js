import express from "express";
import { createUser, verifyUser } from "../controllers/loginControllers.js";
import cors from "cors";

const corsOption = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  preflightContinue: false,
};
export const router = express.Router();

router.post("/register", createUser); //here the path will become like 3000/auth/register

router.post("/login", cors(corsOption), verifyUser); //here the path will become like 3000/auth/login
