const mongoose = require('mongoose');

const { Schema } = mongoose;

const CartSchema = new Schema({
    name     : String,
    isActive : Boolean,
    user     : {
        type : Schema.Types.ObjectId,
        ref  : 'user',
    },
    items : [ {
        type : Schema.Types.ObjectId,
        ref  : 'item',
    } ],

}, { collection: 'cart' });

module.exports = mongoose.model('cart', CartSchema);
