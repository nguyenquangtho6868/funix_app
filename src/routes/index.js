const loginController = require("../controllers/AuthController");
const userController = require("../controllers/UserController");
const AuthMiddleware = require("../middleware/authMiddleware");
const CourseController = require("../controllers/CourseController");
const NotificationController = require("../controllers/notificationController");
const RoomChatController = require("../controllers/RoomChatController");

function route(app) {
  // login and user
  app.post("/login", loginController.loginHandle);
  app.get(
    "/get-list-user",
    AuthMiddleware.authLoginNoRole,
    userController.getListUser
  );
  app.post("/add-user", AuthMiddleware.authLoginNoRole, userController.addUser);
  app.post(
    "/add-listuser",
    AuthMiddleware.authLoginNoRole,
    userController.addListUser
  );
  app.delete(
    "/delete-user",
    AuthMiddleware.authLoginNoRole,
    userController.deleteUser
  );
  app.put(
    "/edit-user",

    userController.editUser
  );
  app.post(
    "/get-user-detail",
    AuthMiddleware.authLoginNoRole,
    userController.getUserDetail
  );

  // Courses
  app.get(
    "/get-list-course",
    AuthMiddleware.authLoginNoRole,
    CourseController.getListCourse
  );
  app.post(
    "/get-list-course-detail",
    AuthMiddleware.authLoginNoRole,
    CourseController.getListCourseDetail
  );
  app.post(
    "/add-course",
    AuthMiddleware.authLoginNoRole,
    CourseController.addCourse
  );
  app.delete(
    "/delete-course",
    AuthMiddleware.authLoginNoRole,
    CourseController.deleteCourse
  );
  // app.delete('/edit-course',AuthMiddleware.authLoginNoRole,CourseController.editUser);

  // Chat room
  app.post(
    "/get-room-chat",
    AuthMiddleware.authLoginNoRole,
    RoomChatController.getRoomChat
  );
  app.post(
    "/get-room-chat-detail",
    AuthMiddleware.authLoginNoRole,
    RoomChatController.getRoomChatDetail
  );
  app.post(
    "/end-room-chat-detail",
    AuthMiddleware.authLoginNoRole,
    RoomChatController.endRoomChatDetail
  );
  app.post(
    "/get-room-chat-check-user-id",
    AuthMiddleware.authLoginNoRole,
    RoomChatController.getRoomCheckUserId
  );

  // Notification
  app.post(
    "/get-list-notification",
    AuthMiddleware.authLoginNoRole,
    NotificationController.getNotificationDetail
  );
}

module.exports = route;
