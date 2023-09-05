import express from 'express'
import {getDishes,getSpecificDish,createDish ,saveDish} from '../controllers/reciepesController.js'

export const router =express.Router();

router.get('/',getDishes); // here the path will become like 3000/reciepe/
 
router.post('/new',createDish) // here the path will become like 3000/reciepe/new

router.put('/',saveDish) // here the path will become like 3000/reciepe/