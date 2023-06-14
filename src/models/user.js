const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    courses: {
        type: Schema.Types.ObjectId,
        ref: 'courses'
    },
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;