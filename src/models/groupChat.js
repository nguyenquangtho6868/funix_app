const mongoose = require('mongoose');

const { Schema } = mongoose;

const GroupChatSchema = new Schema({
    name: String,
    users: {
        type: Array,
        ref: 'users'
    },
    
});

const GroupChatModel = mongoose.model('rooms', GroupChatSchema);
module.exports = GroupChatModel;