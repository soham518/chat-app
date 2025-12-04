import { User } from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import bcrypt from 'bcryptjs';
export const signup = async(req,res) => {
    try{
    const {fullName, email, password} = req.body;
    if(!fullName || !email || !password) {
        return res.status(400).json({
            message: "all feilds are required",
            success: false
        });
    }
    if(password.length < 6) {
        return res.status(400).json({ 
            message: "password must be more than 6 characters",
            success: false
        });
    }
    if(fullName.length<2) {
        return res.status(400).json({ 
            message: "full name must be more than 2 characters",
            success: false
        });
    }
    const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegx.test(email)) {
    return res.status(400).json({
        message: "Enter valid email format",
        success: false
    });
}
    const user = await User.findOne({email:email});
    if(user) {
        return res.status(400).json({
            message: 'email alredy exesist',
            success: false,
        });
    }
    //hash the password before storing it to db.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = new User({
        fullName,
        email,
        password: hashedPassword
    });

    if(newUser) {
        //generate token
        generateToken(newUser._id,res);
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            message: 'user created successfully',
            success: true
        });
        //send a welcome email to user.
    } else {
      return res.status(500).json({
        message: 'something went wrong while regestering user',
        success: false
      });
    }
    }catch(err) {
        console.log(err);
     return res.status(500).json({
        message: 'something went wrong while regestering user',
        success: false,
        error: err
      });
    }
}

export const signin = async(req,res) => {
    try{

    }catch(err) {

    }
}