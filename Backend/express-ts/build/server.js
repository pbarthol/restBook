"use strict";
/* app/server.ts */
Object.defineProperty(exports, "__esModule", { value: true });
// Import everything from express and assign it to the express variable
var express = require("express");
var configDatabase = require("./config/database");
// Import Controllers from controllers entry point
var controllers_1 = require("./controllers");
var controllers_2 = require("./controllers");
var controllers_3 = require("./controllers");
// Connect to the database
var mongoose = require('mongoose').set('debug', true);
// mongoose.connect('mongodb://localhost:27017/restBook');
mongoose.connect(configDatabase.database);
console.log("Connected to the db.");
// Create a new express application instance
var app = express();
// The port the express app will listen on
var port = process.env.PORT || 3000;
// Turn off cors
var cors = require('cors');
app.use(cors());
// Mount the UserController at the /user route
app.use('/api/user', controllers_1.UserController);
app.use('/api/restaurant', controllers_2.RestaurantController);
app.use('/api/booking', controllers_3.BookingController);
// Serve the application at the given port
app.listen(port, function () {
    // Success callback
    console.log("Listening at http://localhost:" + port + "/");
});
