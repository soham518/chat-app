import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { User } from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
// import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import "dotenv/config";

//register user function
export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "all feilds are required",
        success: false,
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "password must be more than 6 characters",
        success: false,
      });
    }
    if (fullName.length < 2) {
      return res.status(400).json({
        message: "full name must be more than 2 characters",
        success: false,
      });
    }
    const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegx.test(email)) {
      return res.status(400).json({
        message: "Enter valid email format",
        success: false,
      });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        message: "email alredy exesist",
        success: false,
      });
    }
    //hash the password before storing it to db.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      //generate token
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        message: "user created successfully",
        success: true,
      });
      // to do- fix (send welcome email)
        //   try{
        //  const result =  await sendWelcomeEmail(newUser.email, newUser.fullName, process.env.CLIENT_URL);
        //   console.log("welcome Email sent successfully",result);
        //   } catch(err) {
        //       console.log("failed to send welcome email",err);
        //   }
    } else {
      return res.status(500).json({
        message: "something went wrong while regestering user",
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "something went wrong while regestering user",
      success: false,
      error: err,
    });
  }
};

//login user
export const login = async (req, res) => {
  try {
    const {email,password} = req.body;
    if(!email || !password) {
      return res.status(400).json({
        success: false,
        message: "all feilds are required"
      });
    }
    const user = await User.findOne({email});
    if(!user) {
     return res.status(400).json({
        success: false,
        message: "invalid credentials" //never tell client which credential is wrong
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "invalid credentials" //never tell client which credential is wrong
      });
    }
    generateToken(user._id,res);
    user.password = undefined;
    res.status(200).json({
      success: true,
      message: 'logged in successfully',
      user: user
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "something went wrong while loging in",err
    })
  }
};

// logout user function
export const logout = async (_, res) => {
  try {
   res.cookie("jwt","",{maxAge:0});
   res.status(200).json({message: "logout successful", success: true})
  } catch (err) {}
};

//update user profile

export const updateProfile = async(req,res) => {
 try{
  const {profilePic} = req.body;
  if(!profilePic) return res.status(400).json({
   message: "profile pic is required"
  });
  const userId = req.user._id;
  const uploadResponse = await cloudinary.uploader.upload(profilePic);

  const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new:true});
  updatedUser.password = undefined;
  res.status(200).json({
    message:"image uploaded successfully",
    success: true,
    updatedUser: updatedUser
  }); 

 }catch(err) {
  console.log(err);
    return res.status(500).json({
      success: false,
      message: "something went wrong while updating profile",err
    });
 }
}