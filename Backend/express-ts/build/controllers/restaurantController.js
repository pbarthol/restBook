"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Restaurant = require('../models/restaurant');
var router = express_1.Router();
// get restaurants
// router.get('/', function(req, res, next) {
//     Restaurant.find(function (err, restaurants) {
//         if (err) return next(err);
//         res.json(restaurants);
//     });
// });
// get restaurants
router.get('/', function (req, res, next) {
    Restaurant.find().then(function (restaurants) {
        res.json(restaurants.map(function (restaurant) { return restaurant.toObject(); }));
        next();
    }).catch(next);
});
router.get('/:id', function (req, res, next) {
    console.log('Restaurant Id:', req.params.id);
    Restaurant.find({ _id: req.params.id }, function (err, doc) {
        if (err)
            return next(err);
        if (doc)
            return res.json(doc);
    });
});
exports.RestaurantController = router;
