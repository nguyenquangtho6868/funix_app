const loginController = require('../controllers/AuthController');
const userController = require('../controllers/UserController');
const AuthMiddleware = require('../middleware/authMiddleware');
const CourseController = require('../controllers/CourseController');
const NotificationController = require('../controllers/notificationController');

function route(app) {

    // login and user
    app.post('/login',loginController.loginHandle);
    app.get('/get-list-user',AuthMiddleware.authLoginNoRole,userController.getListUser);
    app.post('/add-user',AuthMiddleware.authLoginNoRole,userController.addUser);
    app.delete('/delete-user',AuthMiddleware.authLoginNoRole,userController.deleteUser);
    app.delete('/edit-user',AuthMiddleware.authLoginNoRole,userController.editUser);
    app.delete('/get-user-detail',AuthMiddleware.authLoginNoRole,userController.getUserDetail);
    
    // Courses
    app.get('/get-list-course',AuthMiddleware.authLoginNoRole,CourseController.getListCourse);
    app.post('/add-course',AuthMiddleware.authLoginNoRole,CourseController.addCourse);
    app.delete('/delete-course',AuthMiddleware.authLoginNoRole,CourseController.deleteCourse);
    // app.delete('/edit-course',AuthMiddleware.authLoginNoRole,CourseController.editUser);

    // Chat room


    // Notification 
    app.post('/get-list-notification',NotificationController.getNotificationDetail);

}

module.exports = route;
