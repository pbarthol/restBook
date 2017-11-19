"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User = require('../models/user');
var router = express_1.Router();
// router.get('/', (req: Request, res: Response) => {
//     res.send('Hello, User!');
//     console.log('getUser');
// });
router.get('/', function (req, res, next) {
    User.find(function (err, users) {
        if (err)
            return next(err);
        res.json(users);
    });
});
router.get('/:name', function (req, res) {
    var name = req.params.name;
    res.send("Hello User, " + name + "!");
    console.log('getUser');
});
exports.UserController = router;
