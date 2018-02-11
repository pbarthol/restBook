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
});

router.put('/', function(req, res) {
    // use our restaurant model to find the restaurant we want
    console.log("Restaurant (put): " + req.body.restaurant);
    console.log("Restaurant id (put): " + req.body.restaurant._id);
    var restaurantid = req.body.restaurant._id;
    console.log("type of id", typeof(restaurantid));
    console.log("Restaurant Id (put): " + restaurantid);
    var idObj = ObjectId(restaurantid);
    Restaurant.findById(idObj, function(err, restaurant) {
        if (err) {
            return res.status(500).send({error: 'Restaurant not found (http.put).'});
        }
        restaurant.foodType = req.body.restaurant.foodType;
        restaurant.teaserTitle = req.body.restaurant.teaserTitle;
        restaurant.teaserDescription = req.body.restaurant.teaserDescription;
        restaurant.name = req.body.restaurant.name;
        restaurant.street = req.body.restaurant.street;
        restaurant.streetNumber = req.body.restaurant.streetNumber;
        restaurant.postalCode = req.body.restaurant.postalCode;
        restaurant.village = req.body.restaurant.village;
        restaurant.webpage = req.body.restaurant.webpage;
        restaurant.phoneNumber = req.body.restaurant.phoneNumber;
        restaurant.thumbnail = req.body.restaurant.thumbnail;
        restaurant.teaserImage = req.body.restaurant.teaserImage;
        // save the restaurant
        restaurant.save(function(err) {
            if (err) {
                res.send(err);
            }
            return res.json(restaurant);
        });
    });
});

export const RestaurantController: Router = router;