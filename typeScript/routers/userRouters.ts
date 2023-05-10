import express, { Router } from "express";
import {getAllUsers , createUser, updateUser} from './../contollers/userController';
const userrouter: Router = express.Router();
userrouter.get("/getallusers", getAllUsers);
userrouter.post('/createuser', createUser);
userrouter.patch('/updateuser/:id', updateUser);
export default userrouter;