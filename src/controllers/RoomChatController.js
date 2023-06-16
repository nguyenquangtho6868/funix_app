const RoomChatModel = require('../models/roomChat');
const MessageModel = require('../models/message');


class RoomChatController {
    async addRoomChat(data, io) {
        const room = await RoomChatModel.findOne({ _id: data.roomId });
        if (room.users.length > 1) {
            io.emit('quantity-room-chat-full')
            return;
        }
        await RoomChatModel.updateOne({ _id: data.roomId }, {
            users: [...room.users, data.mentor_id]
        });
        io.emit('join-room-chat-success', data)
    }

    async sendMessage(data, io) {
        const date = new Date(Date.now());
        const createdAtDay = date.toLocaleDateString([], { timeZone: "Asia/Saigon" })
        const createdAtTime = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Asia/Saigon",
        });
        const newMessage = await MessageModel.create({
            sender: data.sender,
            content: data.content,
            room: data.room_id,
            createdAtDay,
            createdAtTime
        })
        const getDetailNewMessage = await MessageModel.find(newMessage).populate('sender');
        io.emit('create-new-message', getDetailNewMessage)
    }

    async getRoomChatDetail(req, res) {
        try {
            const { id } = req.body;
            if (!id) {
                return res.status(422).json({ message: 'Have no ID!', statusCode: 500 });
            }
            const getRoom = await RoomChatModel.find({_id: id, is_history: false});
            if(getRoom.length === 1) {
                const messages = await MessageModel.find({ room: id }).populate('sender');
                res.json({ message: 'Get room chat Successfully!', data: messages, statusCode: 200 });
            } else {
                return res.status(422).json({ message: 'Have no room chat with this ID!', statusCode: 500 });
            }
        }
        catch (e) {
            res.status(422).json(e)
        }
    }

    async endRoomChatDetail(req, res) {
        try {
            const { id } = req.body;
            if (!id) {
                return res.status(422).json({ message: 'Have no ID!', statusCode: 500 });
            }
            await RoomChatModel.updateOne({ _id: id }, { is_history: true });
            res.json({ message: 'End room chat Successfully!', statusCode: 200 });
        }
        catch (e) {
            res.status(422).json(e)
        }
    }
}

module.exports = new RoomChatController;