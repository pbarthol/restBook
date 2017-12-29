import { Router, Request, Response } from 'express';
import mongoose = require('mongoose');
var User = require('../models/user');
const router: Router = Router();

// router.get('/', (req: Request, res: Response) => {
//     res.send('Hello, User!');
//     console.log('getUser');
// });
let ObjectId = mongoose.Types.ObjectId;

router.get('/:userid', function(req, res, next) {
    var userid = req.params.userid;
    console.log(typeof(userid));
    console.log("User Id: " + userid);
    var idObj = ObjectId(userid);
    User.findById(idObj, function (err, user) {
        if (err) return next(err);
        res.json(user);
        console.log('Found user: ', user);
    });
});


// router.get('/:name', (req: Request, res: Response) => {
//     let { name } = req.params;
//     res.send(`Hello User, ${name}!`);
//     console.log('getUser');
// });

router.post('/', function(req, res, next) {
    console.log(req.body.user);
    var newUser = new User(req.body.user);
    newUser.save(function (err, user) {
        if (err) {
            console.log(err);
            return res.status(500).send({error: 'User save() failed.'});
        }
        return res.json(user);
    })
});

router.put('/', function(req, res) {
    // use our user model to find the user we want
    console.log("User (put): " + req.body.user);
    console.log("User id (put): " + req.body.user._id);
    var userid = req.body.user._id;
    console.log("type of id", typeof(userid));
    console.log("User Id (put): " + userid);
    var idObj = ObjectId(userid);
    User.findById(idObj, function(err, user) {
        if (err)
            return res.status(500).send({error: 'User not found (http.put).'});
        user.firstname = req.body.user.firstname;
        user.username = req.body.user.username;
        user.password = req.body.user.password;
        user.salutation = req.body.user.salutation;
        user.firstName = req.body.user.firstName;
        user.lastName = req.body.user.lastName;
        user.street = req.body.user.street;
        user.postalCode = req.body.user.postalCode;
        user.city = req.body.user.city;
        user.email = req.body.user.email;
        user.phone = req.body.user.phone;
        // save the user
        user.save(function(err) {
            if (err)
                res.send(err);
            return res.json(user);
        });
    });
});

export const UserController: Router = router;