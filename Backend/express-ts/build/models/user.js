/**
 * Created by Peter on 12.11.2017.
 */
"use strict";
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
// Note collection at mongo db must be 'users' -> Plural
var user = new Schema({
    username: String,
    password: String,
    firstname: { type: String, default: "First Name" },
    lastname: String,
    email: String,
    createddate: Date,
    admin: Boolean
});
// encrypt password before saving
user.pre('save', function (next) {
    var user = this;
    if (user.isModified('password') || user.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }
    else {
        return next();
    }
});
// Create a model based on the schema
module.exports = mongoose.model('User', user);
