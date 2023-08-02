import express from "express";
import { UserModel } from "../module/userModule.js";

export const router = express.Router();

router.post("/register", async (req, res) => {
  let { email, password, phn_no, username } = req.body;
  const user = await UserModel.find(email);
  if (user) {
    return res.json({ msg: "Entered Email has been present" });
  }
  const newUser = await UserModel.create({
    email: email,
    password: password,
    phn_no: phn_no,
    username: username,
  });

  return res.status(201).json({ msg: "Account has been succesfully created" },newUser);
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  const existUser = await UserModel.find(email);
  if (!existUser) {
    res.json({ msg: "No Such User found" });
  }
  if (email === existUser.email) {
    if (password === existUser.password) {
      return res.json({ msg: "Successfully logged in" });
    } else return res.json({ msg: "Please check your password " });
  } else return res.json({ msg: "Please enter the valid email" });
});
