const Notification = require('../models/notification');

class NotificationController {
    async addNotification(data, io) {
        const { question, user_id, description, course_id } = data;
        const date = new Date(Date.now());
        const createdAt =
            date.toLocaleDateString([], { timeZone: "Asia/Saigon" }) +
            " - " +
            date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Saigon",
            });
        const newNotification = await Notification.create({
            sender: user_id,
            question: question,
            description: description,
            course: course_id,
            file: {},
            createdAt
        });
        io.emit(`get-create-notification/${course_id}`, newNotification);
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