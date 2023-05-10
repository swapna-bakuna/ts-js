import jwt from 'jsonwebtoken';
import User, { IUser } from "./../models/userModel";
import dotenv from "dotenv";
import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from "express";
dotenv.config();


async function login(req: any, res: any): Promise<void> {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ status: 'fail', message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
    res.status(200).json({ status: 'success', token });
  } catch (err:any) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}
async function protect (req: any, res: any, next: Function): Promise<void> {
  // get token and check if it exists
  let token: string | undefined;
  if (req.headers.authorization && req.headers.authorization.startsWith('bearer')) {
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
    const existsUser:IUser[] | null= await User.findById(decrypted.id);
    if (!existsUser) {
      return res.status(401).json({ status: 'fail', body: 'user not found' });
    }
    if(existsUser[0].roles == 'admin'){
      return res.status(403).json({ status: 'fail', body: 'Not authorized' });
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ status: 'fail', body: 'Invalid token' });
  }
};


export {login , protect}