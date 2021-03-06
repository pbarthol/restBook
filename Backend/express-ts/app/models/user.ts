/**
 * Created by Peter on 12.11.2017.
 */
"use strict";
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;
// Note collection at mongo db must be 'users' -> Plural
let userSchema = new Schema({
    username: String,
    password: String,
    salutation: String,
    firstName: String,
    lastName: String,
    street: String,
    postalCode: String,
    city: String,
    email: String,
    phone: String,
    createdDate: Date,
    admin: Boolean
});
// encrypt password before saving
userSchema.pre('save', function (next) {
    // console.log('this:', this)
    var user = this;
    if (user.isModified('password') || user.isNew) {
        console.log("User Password changed or New User");
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
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
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (passw, callback) {
    console.log("Compare Password");
    console.log("Password", passw);
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            console.log(err);
            return callback(err);
        }
        if (isMatch)
            console.log("Password ok");
        else
            console.log("Wrong Password");
        callback(null, isMatch);
    });
};

// Create a model based on the schema
module.exports = mongoose.model('User', userSchema);
