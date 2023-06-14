const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
    name: String,
    code: String,
});

const MessageModel = mongoose.model('chats', MessageSchema);
module.exports = MessageModel;