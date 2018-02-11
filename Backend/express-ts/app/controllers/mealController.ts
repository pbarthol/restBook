import { Router, Request, Response } from 'express';
import mongoose = require('mongoose');
import moment 	= require('moment');
var fs = require('fs');
var path = require('path');
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

router.put('/', function(req, res) {
    // use our restaurant model to find the restaurant we want
    console.log("Meal (put): " + req.body.meal);
    console.log("Meal id (put): " + req.body.meal._id);
    var mealid = req.body.restaurant._id;
    console.log("type of id", typeof(mealid));
    console.log("Meal Id (put): " + mealid);
    var idObj = ObjectId(mealid);
    Meal.findById(idObj, function(err, meal) {
        if (err) {
            return res.status(500).send({error: 'Meal not found (http.put).'});
        }
        meal.category = req.body.meal.category;
        meal.title = req.body.meal.title;
        meal.description = req.body.meal.description;
        meal.price = req.body.meal.price;
        // save the meal
        meal.save(function(err) {
            if (err) {
                res.send(err);
            }
            return res.json(meal);
        });
    });
});

// delete meal by id
router.delete('/:id', (req: Request, res: Response, next) => {
    var mealId = req.params['id'];
    var idObj = ObjectId(mealId);
    // find image for delete image
    Meal.findById(idObj, function (err, meal) {
        if (err) return next(err);
        if (meal) {
            var filePath = path.join('public/images/meal/');
            fs.unlinkSync(filePath + meal.image);
            console.log("Image file removed: ", meal.image);
            fs.unlinkSync(filePath + meal.thumbnail);
            console.log("Thumbnail file removed: ", meal.thumbnail);
            // remove meal in database
            Meal.remove({ _id: idObj }, function(err) {
                if (!err) {
                    return res.status(204).end();
                }
                else {
                    return res.status(500).send({error: 'Failure at remove meal'});
                }
            });
        };
    });

});

export const MealController: Router = router;