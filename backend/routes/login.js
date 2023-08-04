import express from "express";
import { UserModel } from "../module/userModule.js";

export const router = express.Router();

router.post("/register", async (req, res) => {
  //here the path will become like 3000/auth/register
  let { email, password, phn_no, username } = req.body;
  const user = await UserModel.findOne({email:email});
  console.log(user);
  if (user) {
    return res.json({ msg: "Entered Email has been present" });
  }
  const newUser = new UserModel({
    email: email,
    password: password,
    phn_no: phn_no,
    username: username,
  });
  await newUser.save();
  return res
    .json({ msg: "Account has been succesfully created" });
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  const existUser = await UserModel.find({email});
  if (!existUser) {
    res.json({ msg: "No Such User found" });
  }
  console.log(existUser.email ,email);
  if (email == existUser.email) {
    if (password == existUser.password) {
      return res.json({ msg: "Successfully logged in" });
    } else return res.json({ msg: "Please check your password " });
  } else return res.json({ msg: "Please enter the valid email" });
});
