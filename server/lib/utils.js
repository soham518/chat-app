import jwt from 'jsonwebtoken';

export const generateToken = async(userId, res) => {
  const token = jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn: "7d",
  });
  console.log("token:",token);
  res.cookie("jwt",token,{
    maxAge: 7*24*60*60*1000, //7days
    httpOnly: true, //prevent xss attack
    sameSite: "strict", // prevent CSRF attack
    secure: process.env.NODE_ENV === "development" ? false : true
  }
  )
}
