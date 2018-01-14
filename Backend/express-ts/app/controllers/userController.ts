import { Router, Request, Response } from 'express';
import mongoose = require('mongoose');
import moment 	= require('moment');
var User = require('../models/user');
const router: Router = Router();
let ObjectId = mongoose.Types.ObjectId;

router.get('/:id', function(req, res, next) {
    var userid = req.params['id'];
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
    var newUser = new User(req.body.user);
    console.log("Post (user)", newUser.username);
    User.findOne({username: newUser.username}, function (err, user) {
        if (err) {
            console.log(err);
            // return res.status(500).send({success: false, msg: 'Error at search the user.'});
            return res.status(500).send({error: 'Failure at find user!'});
        }
        if (user) {
            console.log('username already taken');
            // return res.status(500).send({success: false, msg: 'Username already taken.'});
            return res.status(500).send({error: 'Username already taken!'});
        }
        else {
            User.findOne({email: newUser.email}, function (err, user) {
                if (err) {
                    console.log(err);
                }
                if (user) {
                    console.log('email already taken');
                    // return res.status(500).send({success: false, msg: 'Email already taken.'});
                    return res.status(500).send({error: 'E-Mail already taken!'});
                }
                else {
                    // append date stamp when record was created //
                    newUser.createddate = moment().format();
                    newUser._id = ObjectId();
                    newUser.save(function (err, user) {
                        if (err) {
                            console.log(err);
                            // return res.status(500).send({success: false, msg: 'User save() failed.'});
                            return res.status(500).send({error: 'User save() failed.'});
                        }
                        return res.json(user);
                    })
                }
            })
        }
    })
})

router.put('/', function(req, res) {
    // use our user model to find the user we want
    console.log("User (put): " + req.body.user);
    console.log("User id (put): " + req.body.user._id);
    var userid = req.body.user._id;
    console.log("type of id", typeof(userid));
    console.log("User Id (put): " + userid);
    var idObj = ObjectId(userid);
    User.findById(idObj, function(err, user) {
        if (err) {
            return res.status(500).send({error: 'User not found (http.put).'});
        }
        user.firstname = req.body.user.firstname;
        user.username = req.body.user.username;
        user.salutation = req.body.user.salutation;
        user.firstName = req.body.user.firstName;
        user.lastName = req.body.user.lastName;
        user.street = req.body.user.street;
        user.postalCode = req.body.user.postalCode;
        user.city = req.body.user.city;
        user.email = req.body.user.email;
        user.phone = req.body.user.phone;
        console.log("Password: ", req.body.user.password)
        if (req.body.user.password !== null &&
            req.body.user.password !== undefined &&
            req.body.user.password !== "") {
            // password change!
            user.password = req.body.user.password;
        }
        // save the user
        user.save(function(err) {
            if (err) {
                res.send(err);
            }
            return res.json(user);
        });
    });
});

export const UserController: Router = router;