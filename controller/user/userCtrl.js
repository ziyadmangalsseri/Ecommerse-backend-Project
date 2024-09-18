const User = require("../../models/UserModels");
const jwt = require("jsonwebtoken");
const asyncHandler = require("async-handler");
const sendEmail = require("../../utilities/sendemail");
const { json } = require("body-parser");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    console.log("creatUser process");

    const { email, name, number, password } = req.body;
    console.log(req.body);

    if(!email || !name || !number || !password){
      return res.status(400).json({success:false,message:"all fields are required"})
    }

    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      // create new user
      const hashpassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email: email,
        name: name,
        mobile: number,
        password: hashpassword,
        isAdmin:false
      });
      
      if(newUser.isAdmin){
        res.status(200).redirect("/adminPage");
      }
      res.status(200).redirect("/home");
    } else {
      res.json({
        msg: "User Already Exists",
        success: false,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const userlogin = async (req, res) => {
  console.log("userlogin process started");
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      return res.status(401).json({ success: false, message: "invalid email" });
    }
    const hashPassword = await bcrypt.compare(password, findUser.password);
    if (!hashPassword) {
      return res
        .status(401)
        .json({ success: false, message: "invalid password" });
    }
    
    if(findUser.isAdmin){
      res.status(200).json({success:true,message:"admin login successfully",redirectUrl:"/adminPage"});
    }
    else {
      console.log(findUser);

      req.session.email = findUser.email;
      res.status(200).json({ success: true, message: "successfully",redirectUrl:"/home" });
      console.log(req.session.email);
      // res.status(200).json({ messege: "uesr invalid" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error logging in" });
  }
};

// forgot password

const forgotPassword = async (req, res) => {
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
    const { newPassword, confirmPassword } = req.body;

    console.log("password is ::", newPassword, confirmPassword);

    // const email = req.session.email;
    const { email } = req.session;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "No email found in session" });
    }

    if (!newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "password cannot be empty" });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "password do not match" });
    }
    const user = await User.findOne({ email: email });
    console.log(email);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;

    console.log("password hashed");
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "your password reset is successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  createUser,
  userlogin,
  forgotPassword,
  otpVerification,
  resetPassword,
};