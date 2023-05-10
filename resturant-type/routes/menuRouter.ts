import express, { Router } from 'express';
import { addmenu, updatemenu, getmenu, order, orderstatus, updateOrderStatus } from './../controllers/menuController';
import { protect } from './../controllers/authController';

const menurouter: Router = express.Router();

menurouter.post('/addmenu', protect, addmenu);
menurouter.put('/updatemenu/:id', protect, updatemenu);
menurouter.get('/getmenu', getmenu);
menurouter.post('/order', order);
menurouter.get('/orderstatus', protect, orderstatus);
menurouter.get('/status/:tableno', protect, updateOrderStatus);

export  default  menurouter ;
