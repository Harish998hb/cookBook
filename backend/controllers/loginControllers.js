import { UserModel } from "../module/userModule.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// creating account
export const createUser = async (req, res) => {
  let { email, password, phn_no, username } = req.body;
  const user = await UserModel.findOne({ email: email });
  console.log(user);
  if (user) {
    return res.json({ msg: "Entered Email has been present" });
  }
  const encrptedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    email,
    password: encrptedPassword,
    phn_no,
    username,
  });
  await newUser.save();
  return res.json({ msg: "Account has been succesfully created" });
};

// check the user data

export const verifyUser = async (req, res) => {
  let { email, password } = req.body;
  const existUser = await UserModel.findOne({ email: email });
  if (!existUser) {
    res.json({ msg: "No Such User found" });
  }
  bcrypt.compare(password, existUser.password, function (err, result) {
    if (result) {
      const token = jwt.sign({ id: existUser._id }, "secret");
      return res.json({ token, userId: existUser._id });
    }
    return res.json({ msg: "Entered wrong email or password" });
  });
};

// Fetch User details

export const userDetails = async (req, res) => {
  let { id } = req.params;
  let user = await UserModel.findById(id);
  let dataNeed={
    username:user.username,
    email:user.email,
    phn_no:user.phn_no,
    savedReciepe:user.savedReciepe,
  }
  if (user) return res.json(dataNeed)
  else res.json({msg:"Error"})
};
