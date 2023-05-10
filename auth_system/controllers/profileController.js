const Profile = require("../models/profileModel");
const User = require("./../models/userModel");
const mongoose = require("mongoose");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
  //  request.params is an object containing properties to the named route
  //Params are used for the self defined parameter for receiving request
    let userData = await User.findOne({ _id: userId  });
    let userProfile = await Profile.findOne({ userId: userId  });
    console.log(userData);
    let result = {
      ...userData._doc,...userProfile._doc,
    };
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
exports.createProfile = async (req, res) => {
  console.log(req.body);
  try {
    const newProfile = await Profile.create({
      name: req.body.name,
      college: req.body.college,
      branch: req.body.branch,
      percentage: req.body.percentage,
      userId: req.body.userId
    });
    console.log('data:' , newProfile)
    res.status(201).json({ status: "success", data: { newProfile } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
};