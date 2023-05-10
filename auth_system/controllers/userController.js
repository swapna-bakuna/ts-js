const User = require("./../models/userModel");
const Profile = require("../models/profileModel");
const mongoose = require("mongoose");
exports.getUsers = async (req, res) => {
  try {
    const userIds = req.params.id;
    const userData = [];
    const userProfileData = [];
    for (const userId of userIds) {
      const user = await User.find({ _id: userId });
      const profile = await Profile.find({ userId: userId });
      userData.push(user);
      userProfileData.push(profile);
    }
    const result = userData.concat(userProfileData);
    res.status(200).json({ status: "success", result: result });
    /*const userId = req.params.id; 
    let userData = await User.find({ "_id": { $in: userId } }); 
    let userProfile = await Profile.find({ "userId": { $in: userId } });
    console.log(userData)
    let result = {
      ...userData,
      ...userProfile
    }
    console.log(result,"====RESULT")
    res.status(200).json({
      status: 'success',
       result
    });*/
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
// const result = await User.aggregate([
//   {
//     $match: {
//       _id:  new mongoose.Types.ObjectId(userId)
//     }
//   },
//   {
//             $lookup: {
//               from: 'profiles',
//               localField: '_id',
//               foreignField: 'userId',
//               as: 'profile'
//             }
//           }
// ]);

exports.createUsers = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ status: "success", data: { newUser } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { email: req.body.email },
      {
        new: true,
        runValidator: true,
      }
    );
    res.status(200).json({ status: "success", data: { user } });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getAllUsers = async (req, res) => {
  //console.log('data', req)
  try {
    
    const user = await User.find();
    //({name: 'swapna'})
    //.where('name').equals('swapna')
    res.status(200).json({
      status: "success",
      user: user,
    });
    /*const profiles = await Profile.find();
    // const userIds = profiles.map(asyc (user) => {
    //   const users = await User.find({ _id: user["userId"] });

    // }); 
    let finalResponse = []
    for(let userProfile of profiles){
      let userDetails = await User.findOne({_id:userProfile["userId"]})
      userProfile = {...userProfile._doc,...userDetails._doc}
      finalResponse.push(userProfile)
    }
    // const result = {
    //   ...users, ...profiles
    // };

    res.status(200).json({ status: 'success',finalResponse});
  } catch (err) {
    res.status(400).json({status: 'fail',message: err.message});
  }
};*/
    /* try{
  const allusers = await Profile.find({}).populate('userId');
    res.status(200).json({
      status: 'success',
      data:{
        allusers
      }
    })*/
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};