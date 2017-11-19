"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Peter on 12.11.2017.
 */
var express_1 = require("express");
var router = express_1.Router();
router.get('/', function (req, res) {
    res.send('Hello, Booking!');
    console.log('getBooking');
});
router.get('/:name', function (req, res) {
    var name = req.params.name;
    res.send("Hello Booking, " + name + "!");
    console.log('getBookingByUser');
});
exports.BookingController = router;
