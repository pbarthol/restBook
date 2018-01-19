/**
 * Created by Peter on 12.11.2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Note collection at mongo db must be 'restaurants' -> Plural
let restaurant = new Schema({
    _id: Schema.ObjectId,
    userId: String,
    foodType: String,
    teaserTitle: String,
    teaserDescription: String,
    name: String,
    street: String,
    streetNumber: String,
    postalCode: String,
    village: String,
    phoneNumber: String,
    webpage: String,
    thumbnail: String
});
// Create a model based on the schema
module.exports = mongoose.model('Restaurant', restaurant);
