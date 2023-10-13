import express from "express";
import {
  getDishes,
  getSpecificDish,
  createDish,
  saveDish,
  getSavedDishIds,
  getSavedDishes,
  getDishChef,
  updateDish,
  deleteDish
} from "../controllers/reciepesController.js";

export const router = express.Router();

router.get("/", getDishes); // here the path will become like 3000/reciepe/

// router.get("/search", getDishes); // here the path will become like 3000/reciepe/

router.post("/new", createDish); // here the path will become like 3000/reciepe/new

router.put("/:id", saveDish); // here the path will become like 3000/reciepe/

router.get("/saved/:id", getSavedDishes); // here the path will become like 3000/reciepe/saved_ids

router.get("/saved_ids/:id", getSavedDishIds); // here the path will become like 3000/reciepe/saved_ids

router.get('/:id/chef',getDishChef)

router.get('/:id',getSpecificDish);

router.put('/edit/:id/:userId',updateDish);

router.delete('/delete/:id/:userId',deleteDish);
