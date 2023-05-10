const express = require("express");
const profilerouter = express.Router();
const profileController = require("./../controllers/profileController");
const multer = require("multer");
let upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
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
    filename: function (req, file, cb) {
        cb(null, uuidv4() + "-" + file.originalname);
      },
    }),
  });

profilerouter.route("/profile", upload).post(profileController.createProfile);
//.get(profileController.getProfile)
profilerouter.route("/profile/:id").get(profileController.getProfile);
module.exports = profilerouter;