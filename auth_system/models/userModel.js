const mongoose = require("mongoose");
const validator = require("validator");
//const bcrypt = require('bcryptjs');

//user model
const userSchema = mongoose.Schema({
  name: {
    type: "string",
    required: [true, "Please provide your name"],
    //default:'swapna',
    unique: true,
  },
  email: {
    type: "string",
    required: [true, "Please provide your email"],
    unique: true,
    allowNull: false,
  },
  password: {
    type: "string",
    required: [true, "Please provide your password"],
    allowNull: false,
    minilength: 8,
  },
  passwordConfirm: {
    type: "string",
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "password are not same..!",
    },
    //message: 'password are not the same'
  },
});

/*userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});*/
const User = mongoose.model("User", userSchema);
module.exports = User;
