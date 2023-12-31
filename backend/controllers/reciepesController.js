import { ReciepeModel } from "../module/reciepeModule.js";
import { UserModel } from "../module/userModule.js";

// Fetch all the dishes

export const getDishes = async (req, res) => {
  let { key } = req.query;
  let { pageNo } = (req.params);
  let reciepes = await ReciepeModel.find({
    //condition for filtering
    $or: [
      { dish_name: { $regex: key, $options: "i" } },
      { instructions: { $regex: key, $options: "i" } },
      { ingredients: { $regex: key, $options: "i" } },
    ],
  });
  // const reciepeLen=reciepes.length;

  // Above code can also be done by this method by using where , equals method
  // const reciepes = await ReciepeModel.find()
  // .where('dish_name').equals(key)
  // .where('instructions').equals(key).
  // where('ingredients').equals(key);

  let startIndex = (pageNo - 1) * 6,
    lastIndex = pageNo * 6;
  let result = reciepes.slice(startIndex, lastIndex);
  if (reciepes) {
    return res.json({
      filteredReciepes: result,
      totalReciepesLen: reciepes.length,
    });
  } else {
    res.json({ msg: "Can't fetch the Data" });
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
    console.error(err);
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
    return res;
  } catch (err) {
    console.error(err);
  }
};

// To mark the dish as a saved dish for the specific user

export const saveDish = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;
    console.log(req.body);
    const user = await UserModel.findById(userId);
    const receipe = await ReciepeModel.findById(id);
    // Here we are checking whether there the same reciepe is in savedReciepe list
    const ifExists = user.savedReciepe.find((record) => record._id == id);
    if (!ifExists) {
      user.savedReciepe.push(receipe);
      await user.save();
      return res.json(true);
    } else {
      user.savedReciepe = user.savedReciepe.filter(
        (records) => records._id != id
      );
      await user.save();
      return res.json(false);
    }
  } catch (err) {
    console.error(err);
  }
};

// To get the Saved dish's ids of a specific user

export const getSavedDishIds = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    // res.json({ savedReciepeIds: user?.savedReciepe });
    const savedReciepeIds = user.savedReciepe.map((item) => item._id);
    console.log(savedReciepeIds);
    return res.json(savedReciepeIds);
  } catch (err) {
    console.error(err);
  }
};

// To get the Saved dishes of a specific user

export const getSavedDishes = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    const savedReciepes = await ReciepeModel.find({
      _id: { $in: user?.savedReciepe },
    });
    console.log(savedReciepes);
    // res.json({ saved_dishes: savedReciepes });
    return res.json(savedReciepes);
  } catch (err) {
    console.error(err);
  }
};

// To get the Chef of the specific dish

export const getDishChef = async (req, res) => {
  try {
    const { id } = req.params;
    const receipe = await ReciepeModel.findById(id);
    const chefId = receipe.chef;
    const chef = await UserModel.findById(chefId);
    const chef_name = chef.username;
    res.json(chef_name);
  } catch (err) {
    console.error(err);
  }
};

// Edit a specific recipe this can be only done by the chef only

export const updateDish = async (req, res) => {
  try {
    const newValue = req.body;
    const reciepe = await ReciepeModel.findById(req.params.id);
    const userId = req.params.userId;
    if (userId == reciepe.chef) {
      //  Condition to check whether the chef is same as the current user
      const result = await ReciepeModel.findOneAndUpdate(
        { _id: req.params.id },
        newValue
      );
      res.json({ msg: "Succesfully updated", result: result });
      return res;
    } else {
      res.json({ msg: "You are not an authorized user to change the dish" });
    }
  } catch (err) {
    console.error(err);
  }
};

// Deleting a dish that can only be done by the chef only
export const deleteDish = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const receipe = await ReciepeModel.findById(id);
    // console.log(userId.toString() == receipe.chef);
    if (userId.toString() == receipe.chef) {
      const result = await ReciepeModel.findByIdAndDelete(id);
      return res;
    }
  } catch (err) {
    console.error(err);
  }
};
