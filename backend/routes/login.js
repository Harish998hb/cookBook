import express from "express";
import {
  createUser,
  verifyUser,
  userDetails,
} from "../controllers/loginControllers.js";
import { checkToken } from "../utils/authCheck.js";

export const router = express.Router();

router.post("/register", createUser); //here the path will become like 3000/auth/register

router.post("/login", checkToken, verifyUser); //here the path will become like 3000/auth/login

router.get("/user/:id", userDetails); //here the path will become like 3000/auth/user/:id
