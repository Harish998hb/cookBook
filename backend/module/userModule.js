import mongoose from "mongoose";

const Schema = mongoose.Schema; // Schema is a class and herer we are decribing about the object that we wanna create

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unqiue: false,
    },
    email: {
      type: String,
      required: true,
      unqiue: true,
      get:email=>email
    },
    password: {
      type: String,
      required: true,
      unqiue: false,
      get:password=>password
    },
    phn_no: {
      type: Number,
      required: true,
      unqiue: true,
    },
  },
  { timestamps: true },{getters:true}
); // the second param timestamp here will automatically adds extra 2 fields createdAt and updatedAt

export const UserModel = mongoose.model("users", userSchema); // Here we use model to wrap up the schema and here it automatically creates a collection 'users' for us and thereby providing many methods for data manipulation
