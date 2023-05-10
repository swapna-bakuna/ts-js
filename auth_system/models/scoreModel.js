const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const validator = require('validator');
const scoresSchema = mongoose.Schema({
    userId: {
       type: ObjectId
    },
    subject:{
        type: String 
    },
    marks:{
        type: Number
    }
})
const Score = mongoose.model('Score', scoresSchema);
module.exports = Score;