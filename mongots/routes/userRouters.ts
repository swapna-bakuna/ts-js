import express, { Router } from 'express';
import * as userController from './../controllers/userController';

const userrouter: Router = express.Router();

userrouter
  .route('/users/:id')
  .get(userController.getUsers)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)
  
userrouter
  .route('/user')
  .get(userController.getAllUsers)
  .post(userController.createUser)
userrouter
.route('/aggregate')
  .get(userController.aggregate)
  

export default userrouter;