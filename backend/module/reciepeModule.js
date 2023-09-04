import mongoose from "mongoose";

const Schema=mongoose.Schema;
const reciepeSchema = new Schema({
  dish_name: {
    type: String,
    required: true,
    unique: false,
  },
  img: {
    type: String,
    required: true,
  },
  ingredients: [{ type: String, required: true }],
  instructions: {
    type: String,
    required: true,
  },
  cooking_time:{
    type:Number,
    required:true,
  },
  chef:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'users',
  }
},{timestamps:true});

export const ReciepeModel=mongoose.model('reciepes',reciepeSchema);