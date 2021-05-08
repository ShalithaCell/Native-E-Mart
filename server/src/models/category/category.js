const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
    name     : String,
    isActive : Boolean,

}, { collection: 'category' });

module.exports = mongoose.model('category', CategorySchema);
