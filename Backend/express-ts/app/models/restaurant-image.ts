/**
 * Created by Peter on 14.01.2018.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Note collection at mongo db must be 'restaurants' -> Plural
let restaurantImage = new Schema({
    _id: Schema.ObjectId,
    restaurantId: String,
    image: String,
    sortorder: Number,
});
// Create a model based on the schema
module.exports = mongoose.model('RestaurantImage', restaurantImage);
