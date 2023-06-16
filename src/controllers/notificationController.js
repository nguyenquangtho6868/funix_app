const Notification = require('../models/notification');
const RoomChatModel = require('../models/roomChat');
const MessageModel = require('../models/message');

class NotificationController {
    async addNotification(data, io) {
        const { question, user_id, description, course_id } = data;
        const date = new Date(Date.now());
        const createdAtDay = date.toLocaleDateString([], { timeZone: "Asia/Saigon" })
        const createdAtTime = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Asia/Saigon",
        });
        const room = await RoomChatModel.create({
            users: [user_id],
        });
        await MessageModel.create({
            sender: user_id,
            content: `Câu hỏi : ${question}, Mô tả : ${description}`,
            room: room._id,
            createdAtDay,
            createdAtTime
        });
        const newNotification = await Notification.create({
            sender: user_id,
            question: question,
            description: description,
            course: course_id,
            room: room._id,
            file: {},
            createdAt: createdAtDay+'-'+createdAtTime
        });

        io.emit(`get-create-notification/${course_id}`, newNotification);
        io.emit('create-room-chat', { room_id: room._id, sender_id: user_id });
    }

    async getNotificationDetail(req, res) {
        try {
            const { id } = req.body;
            const listNotification = await Notification.find({ course: id });
            res.json({ message: 'Get list notification Successfully!', data: listNotification, statusCode: 200 });
        }
        catch (e) {
            res.status(422).json(e)
        }
    }
}

module.exports = new NotificationController;