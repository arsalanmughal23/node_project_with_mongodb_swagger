// controllers/userController.js
const UserService = require('../services/userService');

class UserController {
    static async getUsers(req, res) {
        try {
            const users = await UserService.getUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;
