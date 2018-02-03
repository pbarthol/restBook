var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Note collection at mongo db must be 'restaurants' -> Plural
let meal = new Schema({
    _id: Schema.ObjectId,
    restaurantId: String,
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    createdDate: Date
});
// Create a model based on the schema
module.exports = mongoose.model('Meal', meal);
