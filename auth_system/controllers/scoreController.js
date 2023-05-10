const Score = require("../models/scoreModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");
exports.getAllScores = async (req, res) => {
  try {
    let subject = req.query["subject"]
    console.log(subject,"==sd")                  
    const score = await Score.find({subject:subject,"marks":{
      $gt:70
    }})
      //{subject: 'maths'}
    res.status(200).json({ status: "success", data: { scores: score } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
};
exports.addingMarks = async (req, res) => {
  //console.log("body", req.body);
  try {
    const newScore = await Score.create({
      userId: req.body.userId,
      subject: req.body.subject,
      marks: req.body.marks,
    });
    res.status(201).json({ status: "success", data: { newScore } });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "fail", message: err });
  }
};
exports.updatingMarks = async (req, res) => {
  try {
    const scores = await Score.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true,
    });
    res.status(200).json({ status: "success", data: { scores } });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
};
exports.getMarks = async (req, res) => {
  try {
    const userId = req.params.id;
    const scores = await Score.find({ userId });
    res.status(200).json({ status: "success", data: { scores: scores } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
};
