const loginController = require('../controllers/AuthController');
const userController = require('../controllers/UserController');
const AuthMiddleware = require('../middleware/authMiddleware');

function route(app) {

    // login and user
    app.post('/login',loginController.loginHandle);
    app.get('/get-list-user',AuthMiddleware.authLoginNoRole,userController.getListUser);
    app.post('/add-user',AuthMiddleware.authLoginNoRole,userController.addUser);
    app.delete('/delete-user',AuthMiddleware.authLoginNoRole,userController.deleteUser);
    app.delete('/edit-user',AuthMiddleware.authLoginNoRole,userController.editUser);
    app.delete('/get-user-detail',AuthMiddleware.authLoginNoRole,userController.getUserDetail);

    // Chat room
}

module.exports = route;
