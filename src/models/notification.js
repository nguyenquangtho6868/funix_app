const mongoose = require('mongoose');

const { Schema } = mongoose;

const NotificationSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    question: String,
    description: String,
    course: {
        type: Schema.Types.ObjectId,
        ref: 'courses'
    },
    file: {},
    createdAt: {
        type: String,
        required: true,
    }
});

const NotificationModel = mongoose.model('notification', NotificationSchema);
module.exports = NotificationModel;