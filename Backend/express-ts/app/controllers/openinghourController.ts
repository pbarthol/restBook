/**
 * Created by Peter on 10.02.2018.
 */
import { Router, Request, Response } from 'express';
import mongoose = require('mongoose');
var Openinghour = require('../models/openinghours');
const router: Router = Router();
let ObjectId = mongoose.Types.ObjectId;

// get openinghours by restaurant id
router.get('/:id', (req: Request, res: Response, next) => {
    var restaurantId = req.params['id'];
    var idObj = ObjectId(restaurantId);
    Openinghour.find({
        restaurantId: idObj
    }, function (err, openinghours) {
        if (err) return next(err);
        res.json(openinghours);
    });
});

router.post('/', function(req, res, next) {
    let savedOpeninghours: any[] = [];
    console.log("Posted Openinghours: ", req.body.openinghours);
    req.body.openinghours.forEach((newOpeninghour: Openinghour) => {
        Openinghour.findOne({
            restaurantId: newOpeninghour.restaurantId,
            image: newOpeninghour.weekday
        }, function (err, openinghour) {
            if (err) {
                console.log(err);
                return res.status(500).send({error: 'Failure at find openinghour!'});
            }
            if (openinghour) {
                console.log('Openinghour already added');
                return res.status(500).send({error: 'Openinghour already added!'});
            }
            else {
                // append date stamp when record was created //
                let openinghourToSave = new Openinghour();
                openinghourToSave._id = ObjectId();
                openinghourToSave.restaurantId = newOpeninghour.restaurantId;
                openinghourToSave.weekday = newOpeninghour.weekday;
                openinghourToSave.fromTimeMorning = newOpeninghour.fromTimeMorning;
                openinghourToSave.toTimeMorning = newOpeninghour.toTimeMorning;
                openinghourToSave.fromTimeAfternoon = newOpeninghour.fromTimeAfternoon;
                openinghourToSave.toTimeAfternoon = newOpeninghour.toTimeAfternoon;
                openinghourToSave.allDayClosed = newOpeninghour.allDayClosed;
                openinghourToSave.sortorder = newOpeninghour.sortorder;
                openinghourToSave.save(function (err, openinghour) {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({error: 'Restaurant-image save() failed.'});
                    }
                    console.log("saved Openinghour: ", openinghour);
                    savedOpeninghours.push(openinghour);
                })
            }
        })
    });
    return res.json(savedOpeninghours);
})

// delete openinghours by restaurant id
router.delete('/:id', (req: Request, res: Response, next) => {
    var restaurantId = req.params['id'];
    var idObj = ObjectId(restaurantId);
    Openinghour.remove({ restaurantId: idObj }, function(err) {
        if (!err) {
            return res.status(204).end();
        }
        else {
            return res.status(500).send({error: 'Failure at remove restaurant openinghours!'});
        }
    });
});

export const OpeninghourController: Router = router;
