const userRouter = require("express").Router();
const UserController = require("../controller/user.controller");
const userModel = require("../models/user.model");
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

userRouter.post("/signup", UserController.register);
userRouter.post("/login", UserController.login);

// userRouter.use("/",async (req,res,next)=>{
//     //check for jwt token
//     const token = req.headers.cookie.split("=")[1];
//    // console.log(token)
//     if (token) {
//       jwt.verify(token, process.env.SECRET, {}, async (err, userData) => {
//         if (err) res.status(402).json({status:false,message: err});
//         req.user = await userModel.findById(userData._id)
//         next();
//       });
//     } else {
//       res.status(401).send("Access Denied");;
//     }

// });
userRouter.get("/:id", UserController.getUser);
userRouter.get("/", async (req, res) => {
  try {
    //console.log(req.user);
    const courses = await userModel.find();

    return res.json({ success: true, data: courses, message: "here you go" });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
});


userRouter.patch("/:id", UserController.updateUser);


module.exports = userRouter;
