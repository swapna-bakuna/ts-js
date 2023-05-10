const express = require('express');
const userrouter = express.Router();
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController')
userrouter
.route('/users/:id')
.get(userController.getUsers)
userrouter
.route('/user')
.get(userController.getAllUsers)
.post(userController.createUsers)
.patch(userController.updateUser)
.delete(userController.deleteUser)
userrouter
.route('/signup')
.post(authController.signupuser)
userrouter
.route('/login')
.post(authController.login)
module.exports = userrouter;