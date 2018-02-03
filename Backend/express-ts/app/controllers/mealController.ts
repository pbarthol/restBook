import { Router, Request, Response } from 'express';
import mongoose = require('mongoose');
import moment 	= require('moment');
var Meal = require('../models/meal');
const router: Router = Router();
let ObjectId = mongoose.Types.ObjectId;

// get menu by id
router.get('/:id', (req: Request, res: Response, next) => {
    var mealId = req.params['id'];
    var idObj = ObjectId(mealId);
    Meal.findById(idObj, function (err, meal) {
        if (err) return next(err);
        res.json(meal);
    });
});

router.post('/', function(req, res, next) {
    var newMeal = new Meal(req.body.meal);
    console.log("Post (menu)", newMeal.name);
    Meal.findOne({
        restaurantId: newMeal.restaurantId,
        title: newMeal.title
    }, function (err, meal) {
        if (err) {
            console.log(err);
            return res.status(500).send({error: 'Failure at find menu!'});
        }
        if (meal) {
            console.log('menu already added');
            // return res.status(500).send({success: false, msg: 'Username already taken.'});
            return res.status(500).send({error: 'Meal already added!'});
        }
        else {
            // append date stamp when record was created //
            newMeal.createddate = moment().format();
            newMeal._id = ObjectId();
            newMeal.save(function (err, meal) {
                if (err) {
                    console.log(err);
                    return res.status(500).send({error: 'Meal save() failed.'});
                }
                return res.json(meal);
            })
        }
    })
});

export const MealController: Router = router;