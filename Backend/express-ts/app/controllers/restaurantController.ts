import { Router, Request, Response } from 'express';
import mongoose = require('mongoose');
import moment 	= require('moment');
var Restaurant = require('../models/restaurant');
const router: Router = Router();
let ObjectId = mongoose.Types.ObjectId;
// get restaurants
router.get('/', function(req, res, next) {
    Restaurant.find().then(restaurants => {
        res.json(restaurants);
        next();
    }).catch(next);
});
// get restaurant by id
router.get('/:id', (req: Request, res: Response, next) => {
    var restaurantId = req.params['id'];
    var idObj = ObjectId(restaurantId);
    Restaurant.findById(idObj, function (err, restaurant) {
        if (err) return next(err);
        res.json(restaurant);
    });
});

router.post('/', function(req, res, next) {
    var newRestaurant = new Restaurant(req.body.restaurant);
    console.log("Post (restaurant)", newRestaurant.name);
    Restaurant.findOne({
        name: newRestaurant.name,
        street: newRestaurant.street,
        city: newRestaurant.city
    }, function (err, restaurant) {
        if (err) {
            console.log(err);
            return res.status(500).send({error: 'Failure at find restaurant!'});
        }
        if (restaurant) {
            console.log('restaurant already added');
            // return res.status(500).send({success: false, msg: 'Username already taken.'});
            return res.status(500).send({error: 'Restaurant already added!'});
        }
        else {
            // append date stamp when record was created //
            newRestaurant.createddate = moment().format();
            newRestaurant._id = ObjectId();
            newRestaurant.save(function (err, restaurant) {
                if (err) {
                    console.log(err);
                    return res.status(500).send({error: 'Restaurant save() failed.'});
                }
                return res.json(restaurant);
            })
        }
    })
})

export const RestaurantController: Router = router;