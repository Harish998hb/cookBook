import { ReciepeModel } from "../module/reciepeModule.js";
import { ObjectId } from "mongodb";

export const getDishes = async (req, res) => {
  const reciepes = await ReciepeModel.find({});
  if (reciepes) {
    return res.json(reciepes);
  } else {
    res.json({ msg: "Cant fetch the Data" });
  }
};

export const getSpecificDish = async (req, res) => {
  const { name } = req.body;
  const reciepe = await ReciepeModel.findOne({ dish_name: name });
  if (!reciepe) {
    return res.json({ msg: "No such receipe available" });
  } else {
    return res.json(reciepe);
  }
};

export const createDish = async (req, res) => {
  const { dish_name, img, ingredients, cooking_time, chef_id } = req.body;
    const new_dish = new ReciepeModel({
      dish_name,
      img,
      ingredients,
      instructions,
      cooking_time,
      chef: chef_id,
    });
    await new_dish.save();
    res.json({msg :"Dish Created successfully"})
};
