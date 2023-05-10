const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    name:{
        type:'string',
        required: [true, 'Please provide your name']
        //default:'swapna',
        //unique: true
    },
 /*   dateOfBirth: {
            type: Date,
            required: true,
        }, */       
    college:{
        type: 'string'
    },
    branch:{
        type:'string'
    },
    percentage:{
        type: Number
    },
    userId:{
        type: ObjectId
    }
      
})
const Profile = mongoose.model('Profile' , profileSchema);
module.exports = Profile;