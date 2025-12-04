import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        require: true,
        type: String,
        minlength: [2,'name should be of minimum 2 characters'],
    },
    email: {
        require: true,
        type: String,
        unique: true
    },
    password: {
        require: true,
        type: String,
        minlength: [6, 'password should of min 6 characters']
    },
    profilePic: {
        type: String,
        default: ""
     }
   },
  {timestamps: true}
);

export const User = new mongoose.model("User", userSchema);