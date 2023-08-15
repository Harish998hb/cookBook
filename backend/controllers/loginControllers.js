import { UserModel } from "../module/userModule.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// creating account
export const createUser = async (req, res) => {
  let { email, password, phn_no, username } = req.body;
  const user = await UserModel.findOne({ email: email });
  console.log(user);
  if (user) {
    return res.json({ msg: "Entered Email has been present" });
  }
  const encrptedPassword=await bcrypt.hash((password,10));
  const newUser = new UserModel({
    email: email,
    password: encrptedPassword,
    phn_no: phn_no,
    username: username,
  });
  await newUser.save();
  return res.json({ msg: "Account has been succesfully created" });
};

// check the user data

export const verifyUser = async (req, res) => {
  let { email, password } = req.body;
  const existUser = await UserModel.find({ email });
  if (!existUser) {
    res.json({ msg: "No Such User found" });
  }
  const isValidPass= await bcrypt.compare(password,existUser.password);
  
  if(!isValidPass){
    return res.json({msg:"Entered wrong email or password"})
  }

  const token=jwt.sign()

};
