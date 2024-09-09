const User = require("../models/UserModels");
const jwt = require("jsonwebtoken");
const asyncHandler = require("async-handler");
const sendEmail = require("../utilities/sendemail");
const { json } = require("body-parser");
const bcrypt = require("bcrypt");
const UserModels = require("../models/UserModels");

const createUser = async (req, res) => {
  try {
    console.log("creatUser process");

    // const { email, name, number, password } = req.body;
    const {email} = req.body; 
    console.log(req.body);

    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      // create new user

      //   const hashpassword = await bcrypt.hash(password,10);
    //   const newUser = await User.create({
    //     email: email,
    //     name: name,
    //     number: number,
    //     password: password,
    //   });
        const newUser = await User.create(req.body);
      res.status(200).redirect("/home");
    } else {
      res.json({
        msg: "User Already Exists",
        success: false,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "interval server error" });
  }
};

const userlogin = async (req, res) => {
  console.log("userlogin process started");
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const findUser = await User.findOne({ email: email, password: password });
    if (findUser) {
      console.log(findUser);

      req.session.email = findUser.email;
      res.status(200).json({ success: true, message: "successfully" });
      console.log(req.session.email);
    } else {
      res.status(200).json({ messege: "uesr invalid" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error logging in" });
  }
};

// forgot password

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    req.session.email = email;
    console.log(req.body);

    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    //  Generate webToken
    const resetToken = jwt.sign({ id: findUser?._id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });
    // construct the reset url
    const resetUrl = `http://yourfrontend.come/passwordreset/${resetToken}`;
    const message = `You requested password reset, please click the link below to reset your  password  :\n\n${resetUrl}`;

    const otp = Math.floor(100000 + Math.random() * 900000);

    req.session.otp = otp;

    // send email
    await sendEmail({
      email,
      subject: "password reset request",
      message: `your password changing process your otp is :${otp}`,
    });

    console.log(req.body);
    res.status(200).json({ success: true, message: "otp send successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, messgae: "internal server error" });
  }
};

const otpVerification = async (req, res) => {
  try {
    const { otp: userOtp } = req.body;
    const { otp } = req.session;

    console.log("sended otp : ", otp);
    console.log("user enterd otp : ", userOtp);

    if (!otp) {
      return res
        .status(400)
        .json({ success: false, message: "OTP is not found or Expired" });
    }
    if (userOtp === otp.toString()) {
      res.status(200).json({ success: true, message: "successfully verified" });
    } else {
      res.status(200).json({ success: false, message: "verification failed" });
    }
  } catch (err) {
    console.error(err);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword, confirPassword } = req.body;
    const email = req.session.email;
    console.log(
      "new password is :",
      newPassword,
      "confirm password is : ",
      confirPassword
    );

    const validateError = validatePassword(password);

    if (validateError) {
      return res
        .status(400)
        .json({
          success: false,
          message: "no email found in session",
          error: validateError,
        });
    }
    if (newPassword !== confirPassword) {
      return res
        .status(400)
        .json({ success: false, message: "password do not match" });
    }
    //  const user = await User.findOne({email:email});
    //  if(!user){
    // return res.status(404).json({success:false,message:"user not found"});
    //   }else{
    // const hashPassword = await bcrypt.hash(newPassword,10);
    //     user.password = hashPassword;
    //     await user.save();
    //     res.status(200).redirect('/home');

    // }

    const hashedPassword = await bcrypt.hash(password, 10);
    await users.findByIdAndUpdate(req.session.user._id, {
      password: hashedPassword,
    });
    res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

module.exports = {
  createUser,
  userlogin,
  sendOtp,
  otpVerification,
  resetPassword,
};
