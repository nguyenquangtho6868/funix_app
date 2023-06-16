const mongoose = require('mongoose');

const { Schema } = mongoose;

const RoomChatSchema = new Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    messages: { type: Schema.Types.ObjectId, ref: 'messages'},
    is_history: { type: Boolean, default: false}
});

const RoomChatModel = mongoose.model('rooms', RoomChatSchema);
module.exports = RoomChatModel;