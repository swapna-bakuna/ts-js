import { Request, Response } from "express";
import mongodb,{ IUser } from "../models/userModel";

async function getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const users: IUser[] = await mongodb.find();
    res.status(200).json({status:'sucess' ,data:users});
  } catch (err: any) {
    console.error(err);
    res.status(500).send(err.message);
  }
};
async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { roles, email, password } = req.body;
    const users: IUser = await mongodb.create({roles, email, password});
    res.status(201).json({ status: 'success', data: users });
  } catch(err:any) {
    res.status(500).send(err.message);
  }
};
async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.id;
    const { roles, email, password } = req.body; 
    const updatedUser: IUser | null = await mongodb.findByIdAndUpdate(userId, { roles, email, password }, { new: true }); // find the user by ID and update their data

    if (updatedUser) {
      res.status(200).json({ status: 'success', data: updatedUser });
    } else {
      res.status(404).json({ status: 'fail', message: `User with ID ${userId} not found` });
    }
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};
export { getAllUsers , createUser, updateUser }