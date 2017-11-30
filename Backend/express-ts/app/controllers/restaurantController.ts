import { Router, Request, Response } from 'express';
import mongoose = require('mongoose');
var Restaurant = require('../models/restaurant');

const router: Router = Router();

// get restaurants
// router.get('/', function(req, res, next) {
//     Restaurant.find(function (err, restaurants) {
//         if (err) return next(err);
//         res.json(restaurants);
//     });
// });

// get restaurants
router.get('/', function(req, res, next) {
    Restaurant.find().then(restaurants => {
        // res.json(restaurants.map(restaurant => restaurant.toObject()));
        res.json(restaurants);
        next();
    }).catch(next);
});

router.get('/:id', (req: Request, res: Response, next) => {
    console.log('Restaurant Id:', req.params.id);
    Restaurant.find({_id:req.params.id}, function (err, doc) {
        if (err) return next(err);
        if (doc) return res.json(doc);
    });
});

export const RestaurantController: Router = router;