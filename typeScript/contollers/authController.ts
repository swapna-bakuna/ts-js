import jwt from 'jsonwebtoken';
//import { Request, Response } from "express";
import userdata,{IUser} from '../models/userModel'
import dotenv from 'dotenv';
import { promises } from 'dns';
dotenv.config();
async function login(req: any, res: any): Promise<void> {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: 'fail', message: 'Email and password are required' });
    }
  
    try {
      const user: IUser | null = await userdata.findOne({ email });
      if (!user || user.password !== password) {
        return res.status(401).json({ status: 'fail', message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
      res.status(200).json({ status: 'success', token });
    } catch (err:any) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  }
async function checktoken (req: any, res: any, next: Function): Promise<void> {
    // get token and check if it exists
    let token: string | undefined;
    if (req.headers.authorization && req.headers.authorization.startsWith('password')) {
      token = req.headers.authorization.split(' ')[1];
    } 
    console.log(token);
    if (!token) {
      return res.status(401).json({ status: 'fail', body: 'login into access' });
    }
    // verify token
    try {
      const decrypted: any = await jwt.verify(token, process.env.JWT_SECRET!);
      console.log(decrypted);
      // check if user exists
      const existsUser:IUser[] | null= await userdata.findById(decrypted.id);
      if (!existsUser) {
        return res.status(401).json({ status: 'fail', body: 'user not found' });
      }
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ status: 'fail', body: 'Invalid token' });
    }
  };
  export {login, checktoken}