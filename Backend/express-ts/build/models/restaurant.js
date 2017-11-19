"use strict";
/**
 * Created by Peter on 12.11.2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Note collection at mongo db must be 'restaurants' -> Plural
var restaurant = new Schema({
    _id: Schema.ObjectId,
    name: String,
    street: String,
    streetNumber: String,
    postalCode: String,
    village: String,
    phoneNumber: String,
    webpage: String
});
// Create a model based on the schema
module.exports = mongoose.model('Restaurant', restaurant);
