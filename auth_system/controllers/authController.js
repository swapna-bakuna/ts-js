const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');

exports.signupuser = async (req, res) => {
    try {
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });
    const token = jwt.sign({id: newUser._id },  process.env.JWT_SECRET , {
        expiresIn: process.env.JSON_EXPIRES_IN
    })
    res.status(201).json({ status: "success", token, data: { newUser } });
    } catch (err) {
      res.status(400).json({ status: "fail", message: err });
      console.log(err)
    }
  };

exports.login =async (req, res)=>{
    const {email, password} = req.body
   // console.log(req.body)
    //check e, p
    if (!email|| !password){
        return res.status(400).json({ status: 'fail', message: 'Email and password are required' });
    }
    //e =p,
  try{
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email' });
    }
    const passwordMatch = (req.body.password === user.password)
    if (!passwordMatch) {
      console.log(passwordMatch,"=-",password)
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  //s t
  const token = jwt.sign({id: user._id },  process.env.JWT_SECRET , {
    expiresIn: process.env.JSON_EXPIRES_IN
})
  return res.status(200).json({ token, message: 'Login successful' });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ status: 'fail', message: 'Internal server error' });
    }
  };