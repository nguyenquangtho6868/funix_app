const mongoose = require('mongoose');

const { Schema } = mongoose;

const RoomChatSchema = new Schema({
    name: String,
    users: {
        type: Array,
        ref: 'users'
    },
    
});

const RoomChatModel = mongoose.model('rooms', RoomChatSchema);
module.exports = CourseModel;