// services/userService.js
const UserModel = require('../models/userModel');

class UserService {
    static getUsers() {
        return UserModel.getAllUsers();
    }
}

module.exports = UserService;
