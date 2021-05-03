const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    username : String,
    password : String }, { collection: 'user' });

module.exports = mongoose.model('user', UserSchema);
