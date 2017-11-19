import { Router, Request, Response } from 'express';
var User = require('../models/user');

const router: Router = Router();

// router.get('/', (req: Request, res: Response) => {
//     res.send('Hello, User!');
//     console.log('getUser');
// });

router.get('/', function(req, res, next) {
    User.find(function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});


router.get('/:name', (req: Request, res: Response) => {
    let { name } = req.params;
    res.send(`Hello User, ${name}!`);
    console.log('getUser');
});

export const UserController: Router = router;