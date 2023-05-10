import express, { Router } from "express";
const profilerouter: Router = express.Router();
import { getprofile, createprofile } from "../contollers/profileController";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { Request} from "express";
import fs from "fs";
let upload = multer({
  storage: multer.diskStorage({
    destination: function (_req:Request, file, cb) {
      try {
        let path = "./uploads/";

        if (!fs.existsSync(path)) {
          fs.mkdirSync(path, {
            recursive: true,
          });
        }

        cb(null, path);
      } catch (e) {
        console.error("ERROR IN DESTINATION :-", e);
      }
    },

    filename: function (_req: Request, file, cb) {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  }),
});
profilerouter.get("/getprofile/:id", getprofile);
profilerouter.post("/createprofile", upload.single('photo'),createprofile);
export default profilerouter;