import { Router, Request, Response } from 'express';
import mongoose = require('mongoose');
import moment 	= require('moment');
var Meal = require('../models/meal');
const router: Router = Router();
let ObjectId = mongoose.Types.ObjectId;

// get menu by restaurantId
router.get('/:id', (req: Request, res: Response, next) => {
    var restaurantId = req.params['id'];
    var idObj = ObjectId(restaurantId);
    Meal.find({
        restaurantId: idObj
    }, function (err, meals) {
        if (err) return next(err);
        res.json(meals);
    });
});

export const MealsController: Router = router;
