const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');

exports.signupuser = async (req, res) => {
    console.log(req.body)
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

exports.login = (req, res, next)=>{
    const {email, password} = req.body
    //check e, p
    if (!email|| !password){
        return res.status(400).json({ status: 'fail', message: 'Email and password are required' });
    }
    //e =p,

    //send token to client 
    const token = '';
    res.status(200).json({
        status: 'sucess',
        token
    })

}