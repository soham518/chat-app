import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import {arcjetProtection} from "../middlewares/arcjet.middleware.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
const router = express.Router();
// router.use(arcjetProtection); //commenting arcjet bot protection due to postman testing in development phase
//signup route
//dummy test route to test arcjet through browser as postman is detected as bot
router.get("/test", (req,res) => {
  res.json({
    message: "test route to check arcjet."
  })
});
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

//check if user is authenticated.
//We attach authenticated user on req because req flows forward, but res only flows outward.
//we send req.user as request through protect-route middleware so that it can be accessed to the next function 
//in the route. and next function can access it by req.user(and not by res.user)
router.get("/check", protectRoute, (req, res) => {
    if(!req.user) {
        res.status(400).json({
    message: "user not found",
    success: false,
  });
    }
  console.log("req-user",req.user);
  res.status(200).json({
    message: "user is authenticated",
    success: true,
  });
});
export default router;
