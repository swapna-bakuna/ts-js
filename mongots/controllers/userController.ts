import {User} from './../models/userModel';
import { Db, ObjectId, WithId } from 'mongodb'
import { Request, Response } from "express";

async function getUsers(req:any, res:any):Promise<void>{
  console.log(req.body)
  try{
    const db:Db = req.app.locals.db;
   // const userId = Types.ObjectId(req.params.id)
    const userId = req.params.id;
    const userIdObj = new ObjectId(userId);
    const user = await db.collection<User>('user').findOne({_id: userIdObj});
    console.log(user)
    res.status(200).json({status: 'success', data: user})
  }catch(err:any){
    res.status(404).json({status:'fail', data: err.message})
  }
}
async function getAllUsers(req:any, res:any):Promise<void>{
  try{
    const db:Db = req.app.locals.db;
    const user:User[] | null = await db.collection<User>('user').find().toArray();
    res.status(200).json({status:'success', data: user});
  }catch(err:any){
    res.status(404).json({status:'fail', data: err.message})
  }
}

async function createUser(req: any, res: any) {
  try {
    const db: Db = req.app.locals.db;
    const user= {
      email: req.body.email,
      password: req.body.password,
      phoneno: req.body.phoneno
    };
    console.log(user)
    const result = await db.collection<User>("user").insertOne(user);
    console.log(result)
    res.status(201).json({ status: "success", data: result });
  } catch (err: any) {
    res.status(400).json({ status: "fail", message: err.message });
  }
}

async function updateUser(req: any, res: any): Promise<void> {
  try {
    const db: Db = req.app.locals.db;
    const userId = req.params.id;
    const userIdObj = new ObjectId(userId);
    const updatedUserData = req.body;
    //options: any =  { updatedExisting: true } ;
    const result = await db.collection<User>('user').findOneAndUpdate(
      { _id: userIdObj },
      { $set: updatedUserData }
     // , options
    );
    res.status(200).json({ status: 'success', message: result });
  } catch (err:any) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
}

async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const db: Db = req.app.locals.db;
    const userId = req.params.id;
    const userIdObj = new ObjectId(userId);
    const result = await db.collection<User>('user').deleteOne({ id: userIdObj });
    if (result.deletedCount === 1) {
      res.status(200).json({ status: 'success', message: 'User deleted' });
    } else {
      res.status(404).json({ status: 'fail', message: 'User not found' });
    }
  } catch (err:any) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
}

async function aggregate(req:any, res:any): Promise<void> {
  try {
    const db: Db = req.app.locals.db;
    //const query:object = req.query.email
    //const email: string = req.query.email;
    //const query: object = { email };
    const user: User[] | null = await db.collection<User>('user').find({
    }).toArray();
    res.status(200).json({ status: 'success', data: user });
  } catch (err:any) {
    res.status(404).json({ status: 'fail', data: err.message })
  }
}

export {getUsers, getAllUsers, createUser, updateUser, deleteUser, aggregate}