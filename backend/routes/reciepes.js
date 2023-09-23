import express from "express";
import {
  getDishes,
  getSpecificDish,
  createDish,
  saveDish,
  getSavedDishIds,
  getSavedDish,
  getDishChef,
  updateDish
} from "../controllers/reciepesController.js";

export const router = express.Router();

router.get("/", getDishes); // here the path will become like 3000/reciepe/

router.post("/new", createDish); // here the path will become like 3000/reciepe/new

router.put("/", saveDish); // here the path will become like 3000/reciepe/

router.get("/saved", getSavedDish); // here the path will become like 3000/reciepe/saved_ids

router.get("/saved/ids", getSavedDishIds); // here the path will become like 3000/reciepe/saved_ids

router.get('/id/chef',getDishChef)

router.get('/:id',getSpecificDish);

router.get('/edit/:id',updateDish);