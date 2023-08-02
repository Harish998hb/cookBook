import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unqiue: false,
  },
  email: {
    type: String,
    required: true,
    unqiue: true,
  },
  password: {
    type: String,
    required: true,
    unqiue: false,
  },
  phn_no: {
    type: Number,
    required: true,
    unqiue: true,
  },
  
},{timestamps:true});

export const UserModel=mongoose.model('users',userSchema);
