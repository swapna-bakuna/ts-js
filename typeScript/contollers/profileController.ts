import { Request, Response} from "express";
import profiledata,{IProfile} from '../models/profileModel'
import userdata, {IUser} from '../models/userModel'
import { promises } from "readline";
import { AnyARecord } from "dns";

async function getprofile (req: Request, res:Response): Promise<void>{
  console.log(req.body)
    try{
     const userId = req.params.id 
        const profileinf:IProfile[] = await profiledata.find({_id: userId}) 
        const userinf:IUser[]  = await userdata.find({userId: userId })
        const result = {
          ...profileinf ,
          ...userinf };
        res.status(200).json({status:'sucess', data: result})
    }catch(err:any){
        res.status(404).json({status: 'fail', data: err})
    }
}
async function createprofile(req: Request, res: Response): Promise<void> {
  console.log(req.body);
    try {
      const profile: IProfile= await profiledata.create({
        userId: req.body.userId, 
        college:req.body.college, 
        percentage: req.body.percentage, 
        photo: req.file.path});
        console.log(profile)
      res.status(201).json({ status: 'success', data: profile});
    } catch(err:any) {
      res.status(400).send(err.message);
    }
};
export {getprofile, createprofile}