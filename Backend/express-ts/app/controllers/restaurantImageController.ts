/**
 * Created by Peter on 14.01.2018.
 */
import { Router, Request, Response } from 'express';
import mongoose = require('mongoose');
import moment 	= require('moment');
var Restaurant = require('../models/restaurant');
var RestaurantImage = require('../models/restaurant-image');
const router: Router = Router();
let ObjectId = mongoose.Types.ObjectId;

var RestaurantImage = require('../models/restaurant-image');

router.post('/', function(req, res, next) {
    let savedImages: any[] = [];
    console.log("Images:", req.body.restaurantImages);
    req.body.restaurantImages.forEach((newRestaurantImage: RestaurantImage) => {
        RestaurantImage.findOne({
            restaurantId: newRestaurantImage.restaurantId,
            image: newRestaurantImage.image
        }, function (err, restaurantImage) {
            if (err) {
                console.log(err);
                return res.status(500).send({error: 'Failure at find restaurant-image!'});
            }
            if (restaurantImage) {
                console.log('restaurant image already added');
                // return res.status(500).send({success: false, msg: 'Username already taken.'});
                return res.status(500).send({error: 'RestaurantImage already added!'});
            }
            else {
                // append date stamp when record was created //
                let imageToSave = new RestaurantImage();
                imageToSave._id = ObjectId();
                imageToSave.restaurantId = newRestaurantImage.restaurantId;
                imageToSave.image = newRestaurantImage.image;
                imageToSave.thumbnail = newRestaurantImage.thumbnail;
                imageToSave.teaserImage = newRestaurantImage.teaserImage;
                imageToSave.sortorder = newRestaurantImage.sortorder;
                imageToSave.save(function (err, restaurantImage) {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({error: 'Restaurant-image save() failed.'});
                    }
                    console.log("saved Image: ", restaurantImage);
                    savedImages.push(restaurantImage);
                })
            }
        })
    });
    return res.json(savedImages);
});

// get images by restaurant id
router.get('/:id', (req: Request, res: Response, next) => {
    var restaurantId = req.params['id'];
    var idObj = ObjectId(restaurantId);
    RestaurantImage.find({restaurantId: idObj}).sort('sortorder').exec(function (err, restaurantImages) {
        if (err) return next(err);
        res.json(restaurantImages);
    });
});

// delete images by restaurant id
router.delete('/:id', (req: Request, res: Response, next) => {
    var restaurantId = req.params['id'];
    var idObj = ObjectId(restaurantId);
    RestaurantImage.remove({ restaurantId: idObj }, function(err) {
        if (!err) {
            return res.status(204).end();
        }
        else {
            return res.status(500).send({error: 'Failure at remove restaurant image registration'});
        }
    });
});

export const RestaurantImageController: Router = router;
