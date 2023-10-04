import { ReciepeModel } from "../module/reciepeModule.js";
import { UserModel } from "../module/userModule.js";

// Fetch all the dishes

export const getDishes = async (req, res) => {
  const reciepes = await ReciepeModel.find({});
  console.log(typeof reciepes);
  if (reciepes) {
    return res.json(reciepes);
  } else {
    res.json({ msg: "Can,t fetch the Data" });
  }
};

// To get a specific dish

export const getSpecificDish = async (req, res) => {
  const { id } = req.params;
  try {
    const reciepe = await ReciepeModel.findById(id);
    if (!reciepe) {
      return res.json({ msg: "No such receipe available" });
    } else {
      return res.json(reciepe);
    }
  } catch (err) {
    console.log(err);
  }
};

// To create a new recipe

export const createDish = async (req, res) => {
  try {
    const {
      dish_name,
      img,
      ingredients,
      instructions,
      description,
      cooking_time,
      chef_id,
    } = req.body;
    const new_dish = new ReciepeModel({
      dish_name,
      img,
      ingredients,
      instructions,
      cooking_time,
      description,
      chef: chef_id,
    });
    await new_dish.save();
    res.json({ msg: "Dish Created successfully" });
  } catch (err) {
    console.error(err);
  }
};

// To mark the dish as a saved dish for the specific user

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

// To get the Saved dish's ids of a specific user

export const getSavedDishIds = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    res.json({ savedReciepe: user?.savedReciepe });
  } catch (err) {
    console.error(err);
  }
};

// To get the Saved dishes of a specific user

export const getSavedDish = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await UserModel.findById(userId);
    const savedReciepes = await ReciepeModel.find({
      _id: { $in: user?.savedReciepe },
    });
    res.json({ saved_dishes: savedReciepes });
  } catch (err) {
    console.error(err);
  }
};

// To get the Chef of the specific dish

export const getDishChef = async (req, res) => {
  try {
    const  {id}  = req.params;
    const receipe = await ReciepeModel.findById(id);
    const chefId = receipe.chef;
    const chef = await UserModel.findById(chefId);
    const chef_name=chef.username
    res.json(chef_name);
  } catch (err) {
    console.error(err);
  }
};

// Edit a specific recipe this can be only done by the chef only

export const updateDish = async (req, res) => {
  try {
    const newValue = req.body.changes;
    const reciepe = await ReciepeModel.findById(req.params.id);
    const userId = req.body.userId;
    console.log(userId, reciepe.chef);
    if (userId == reciepe.chef) {
      //  Condition to check whether the chef is same as the current user
      const result = await ReciepeModel.findOneAndUpdate(
        { _id: req.params.id },
        newValue
      );
      res.json({ msg: "Succesfully updated", result: result });
    } else {
      res.json({ msg: "You are not an authorized user to change the dish" });
    }
  } catch (err) {
    console.error(err);
  }
};
