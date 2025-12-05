import "dotenv/config";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log(req.cookies.jwt);
    if (!token)
      return res
        .status(401)
        .json({ message: "unauthorized - no token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      res.status(401).json({ message: "unauthorized - invalid token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    console.log("user:", user);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    //Middleware is meant to process the request before it reaches route handler,
    //We attach authenticated user on req because req flows forward, but res only flows outward.
    //use add the user details in the request so that it can be used by next() functions/middlewares
    req.user = user;
    next();
  } catch (error) {
    console.log("error in protect route middleware", error);
    res.status(500).json({
      message: "internal server error at protect route middleware",
    });
  }
};
