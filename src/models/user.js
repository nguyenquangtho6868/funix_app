const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    courses: Array,
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;