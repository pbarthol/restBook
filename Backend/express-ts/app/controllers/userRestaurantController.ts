/**
 * Created by Peter on 06.01.2018.
 */
import { Router, Request, Response } from 'express';
import mongoose = require('mongoose');
var Restaurant = require('../models/restaurant');
const router: Router = Router();
let ObjectId = mongoose.Types.ObjectId;

router.get('/:userid', function(req, res, next) {
    var userid = req.params['userid'];
    console.log(typeof(userid));
    console.log("User Id: " + userid);
    var idObj = ObjectId(userid);
    Restaurant.find({userId: idObj}, function (err, restaurants) {
        if (err) return next(err);
        res.json(restaurants);
        console.log('Found Userrestaurants: ', restaurants);
    });
});

export const UserRestaurantController: Router = router;