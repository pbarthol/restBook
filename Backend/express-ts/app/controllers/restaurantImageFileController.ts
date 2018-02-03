/**
 * Created by Peter on 03.02.2018.
 */
import { Router, Request, Response } from 'express';
import mongoose = require('mongoose');
import moment 	= require('moment');
var fs = require('fs');
var path = require('path');
var RestaurantImage = require('../models/restaurant-image');
const router: Router = Router();
let ObjectId = mongoose.Types.ObjectId;

// delete images by restaurant id
router.delete('/', (req: Request, res: Response, next) => {
    console.log("Begin Image File remove: ", req.body);
    var restaurantImage = req.body['restaurantImageToRemove'];
    var filePath = path.join('public/images/restaurant/');
    fs.unlinkSync(filePath + restaurantImage.image);
    fs.unlinkSync(filePath + restaurantImage.thumbnail);
    fs.unlinkSync(filePath + restaurantImage.teaserImage);
    fs.unlinkSync(filePath + String(restaurantImage.image.replace('_resized', '')));
    console.log("Files removed: ", restaurantImage);
    // remove image entity
    RestaurantImage.find({'_id': restaurantImage._id}).remove().exec();
    return res.status(204).end();
});

export const RestaurantImageFileController: Router = router;
