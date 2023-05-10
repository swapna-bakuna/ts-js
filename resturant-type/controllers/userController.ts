import { Request, Response } from 'express';
import User, { IUser } from './../models/userModel';

export const signup = async (req: Request, res: Response) => {
  try {
    const user:IUser = await User.create({
      roles: req.body.roles,
      email: req.body.email,
      password: req.body.password
    });
    res.status(201).json({ status: 'success', body: user });
  } catch (err:any) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

export const getusers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({ status: 'success', data: users });
  } catch (err:any) {
    res.status(404).json({ status: 'fail', data: err.message });
  }
};
