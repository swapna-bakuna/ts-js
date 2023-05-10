import express, { Router } from 'express';
import { signup, getusers } from '../controllers/userController';
import { login } from '../controllers/authController';

const userrouter: Router = express.Router();

userrouter.post('/signup', signup);
userrouter.get('/getusers', getusers);
userrouter.post('/login', login);

export default userrouter ;
