const UserServices = require("../service/user.service");
const UserModel = require("../models/user.model");
require("dotenv").config();

exports.register = async (req, res, next) => {
  try {
    const { name, email, password} = req.body;
    console.log(email)
    const duplicate = 
       await UserServices.getUserByEmail(email)
     
    console.log(duplicate);
    if (duplicate != null) {
      // throw new Error(`UserName ${email}, Already Registered`)
      return res.json({
        status: false,
        message: `Email ${email}, Already Registered`,duplicate:true
      });
    }

    const successRes = await UserServices.registerUser(
      name,
      email,
      password
    );

    let tokenData;
    tokenData = { _id: successRes._id, email: successRes.email };

    const token = await UserServices.generateAccessToken(
      tokenData,
      process.env.SECRET || "lakshay",
      process.env.EXP
    );
    return res
      .cookie("token", token, { sameSite: "none", secure: true })
      .json({
        status: true,
        data: successRes,
        message: "user registered",
        token: token,
      });
  } catch (error) {
    //console.log(error);
    return res.json({ status: false, data: [], message: "error: " + error });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { phone, email, password } = req.body;

    console.log(phone, email, password);
    if (!email ) {
      throw new Error("Parameter are not correct");
    }
    if (!password) {
      throw new Error("Parameter are not correct");
    }

    const user = 
      await UserServices.getUserByEmail(email);

    //console.log(user);
    if (!user) {
      return res
        .status(201)
        .json({ status: false, message: "User does not exist" });
      //throw new Error("User does not exist");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (isPasswordCorrect === false) {
      return res
        .status(202)
        .json({
          status: false,
          message: "Username or Password does not match",
        });
      //throw new Error(`Username or Password does not match`);
    }
    // Creating Token
    let tokenData;
    tokenData = { _id: user._id, email: user.email };

    const token = await UserServices.generateAccessToken(
      tokenData,
      process.env.SECRET || "lakshay",
      process.env.EXP
    );
    res
      
      .cookie("token", token, { sameSite: "none", secure: true })
      .status(200)
      .json({ status: true, success: user, token: token });
  } catch (error) {
    res.status(401).json({ status: false, message: "erroe: " + error });
    next(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      throw "user not found!";
    }

    return res.json({
      success: true,
      data: updatedUser,
      message: "User updated!",
    });
  } catch (ex) {
    //console.log(ex)
    return res.json({ success: false, message: ex });
  }
};



exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await UserModel.findById(userId);

    return res.json({ success: true, data: user, message: "here you go" });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};
