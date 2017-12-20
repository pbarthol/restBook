/**
 * Created by Peter on 12.11.2017.
 */
"use strict";
let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
let Schema = mongoose.Schema;
// Note collection at mongo db must be 'users' -> Plural
let user = new Schema({
    username: String,
    password: String,
    salutation: String,
    firstName: String,
    lastName: String,
    street: String,
    postalcode: String,
    city: String,
    email: String,
    phone: String,
    createdDate: Date,
    admin: Boolean
});
// // encrypt password before saving
// user.pre('save', function (next) {
//     let user = this;
//     if (user.isModified('password') || user.isNew) {
//         bcrypt.genSalt(10, function (err, salt) {
//             if (err) {
//                 return next(err);
//             }
//             bcrypt.hash(user.password, salt, function (err, hash) {
//                 if (err) {
//                     return next(err);
//                 }
//                 user.password = hash;
//                 next();
//             });
//         });
//     } else {
//         return next();
//     }
// });


// Create a model based on the schema
module.exports = mongoose.model('User', user);
