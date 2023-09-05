import { ReciepeModel } from "../module/reciepeModule.js";
import { UserModel } from "../module/userModule.js";

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
  try {
    const { dish_name, img, ingredients, instructions, cooking_time, chef_id } =
      req.body;
    const new_dish = new ReciepeModel({
      dish_name,
      img,
      ingredients,
      instructions,
      cooking_time,
      chef: chef_id,
    });
    await new_dish.save();
    res.json({ msg: "Dish Created successfully" });
  } catch (err) {
    console.error(err);
  }
};

export const saveDish = async (req, res) => {
  try {
    const { userId, reciepeId } = req.body;
    const user = await UserModel.findById(userId);
    const receipe = await ReciepeModel.findById(reciepeId);
    user.savedReciepe.push(receipe);
    await user.save();
    res.json({ "saved reciepes": user.savedReciepe });
  } catch (err) {
    console.error(err);
  }
};

export const getSavedDish = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    res.json({ savedReciepe: user.savedReciepe });
  } catch (err) {
    console.error(err);
  }
};
