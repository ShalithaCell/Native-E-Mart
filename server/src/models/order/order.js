const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
    name            : String,
    qty             : Number,
    discount        : Number,
    shippingDetails : String,
    total           : Number,
    isActive        : Boolean,
    cart            : {
        type : Schema.Types.ObjectId,
        ref  : 'cart',
    },
    user : {
        type : Schema.Types.ObjectId,
        ref  : 'user',
    },

    items : [ {
        type : Schema.Types.ObjectId,
        ref  : 'item',
    } ],

}, { collection: 'order' });

module.exports = mongoose.model('order', OrderSchema);
