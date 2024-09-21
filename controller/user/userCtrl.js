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

    if (!email || !name || !number || !password) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required" });
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
        isAdmin: false,
      });

      if (newUser.isAdmin) {
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

    if (findUser.isAdmin) {
      res.status(200).json({
        success: true,
        message: "admin login successfully",
        redirectUrl: "/adminPage",
      });
    } else {
      console.log(findUser);

      req.session.email = findUser.email;
      res
        .status(200)
        .json({ success: true, message: "successfully", redirectUrl: "/home" });
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
    // const Username = await User.findOne({});
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

    const now = new Date();
    const day = now.getDate();
    const year = now.getFullYear();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = months[now.getMonth()]; // Get the month name

    const emailTemplate = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Static Template</title>
    
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style="
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: #ffffff;
          font-size: 14px;
        "
      >
        <div
          style="
            max-width: 680px;
            margin: 0 auto;
            padding: 45px 30px 60px;
            background: #f4f7ff;
            background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner);
            background-repeat: no-repeat;
            background-size: 800px 452px;
            background-position: top center;
            font-size: 14px;
            color: #434343;
          "
        >
          <header>
            <table style="width: 100%;">
              <tbody>
                <tr style="height: 0;">
                  <td>
                    <img
                      alt=""
                      src="http://localhost:8002/public/assets/images/logo.png"
                      height="30px"
                    />
                  </td>
                  <td style="text-align: right;">
                    <span
                      style="font-size: 16px; line-height: 30px; color: #ffffff;"
                      >${day} ${monthName}, ${year}</span
                    >
                  </td>
                </tr> 
              </tbody>
            </table>
          </header>
    
          <main>
            <div
              style="
                margin: 0;
                margin-top: 70px;
                padding: 92px 30px 115px;
                background: #ffffff;
                border-radius: 30px;
                text-align: center;
              "
            >
              <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                <h1
                  style="
                    margin: 0;
                    font-size: 24px;
                    font-weight: 500;
                    color: #1f1f1f;
                  "
                >
                  Your OTP
                </h1>
                <p
                  style="
                    margin: 0;
                    margin-top: 17px;
                    font-size: 16px;
                    font-weight: 500;
                  "
                >
                Hey ${findUser.name},
                </p>
                <p
                  style="
                    margin: 0;
                    margin-top: 17px;
                    font-weight: 500;
                    letter-spacing: 0.56px;
                  "
                >
                  Thank you for choosing Marazzo Company. Use the following OTP
                  to complete the procedure to change your email address. OTP is
                  valid for
                  <span style="font-weight: 600; color: #1f1f1f;">5 minutes</span>.
                  Do not share this code with others, including Marrazo
                  employees.
                </p>
                <p
                  style="
                    margin: 0;
                    margin-top: 60px;
                    margin-left: 20px;
                    font-size: 30px;
                    font-weight: 500;
                    letter-spacing: 20px;
                    color: #ba3d4f;
                  "
                > ${otp}
                </p>
              </div>
            </div>
    
            <p
              style="
                max-width: 400px;
                margin: 0 auto;
                margin-top: 90px;
                text-align: center;
                font-weight: 500;
                color: #8c8c8c;
              "
            >
              Need help? Ask at
              <a
                href="mailto:archisketch@gmail.com"
                style="color: #499fb6; text-decoration: none;"
                >ziyadpes9696@gmail.com</a
              >
              or visit our
              <a
                href=""
                target="_blank"
                style="color: #499fb6; text-decoration: none;"
                >Help Center</a
              >
            </p>
          </main>
    
          <footer
            style="
              width: 100%;
              max-width: 490px;
              margin: 20px auto 0;
              text-align: center;
              border-top: 1px solid #e6ebf1;
            "
          >
            <p
              style="
                margin: 0;
                margin-top: 40px;
                font-size: 16px;
                font-weight: 600;
                color: #434343;
              "
            >
              Marrazo Company
            </p>
            <p style="margin: 0; margin-top: 8px; color: #434343;">
              Address 936324, City, State.
            </p>
            <div style="margin: 0; margin-top: 16px;">
              <a href="" target="_blank" style="display: inline-block;">
                <img
                  width="36px"
                  alt="Facebook"
                  src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook"
                />
              </a>
              <a
                href=""
                target="_blank"
                style="display: inline-block; margin-left: 8px;"
              >
                <img
                  width="36px"
                  alt="Instagram"
                  src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram"
              /></a>
              <a
                href=""
                target="_blank"
                style="display: inline-block; margin-left: 8px;"
              >
                <img
                  width="36px"
                  alt="Twitter"
                  src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter"
                />
              </a>
              <a
                href=""
                target="_blank"
                style="display: inline-block; margin-left: 8px;"
              >
                <img
                  width="36px"
                  alt="Youtube"
                  src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube"
              /></a>
            </div>
            <p style="margin: 0; margin-top: 16px; color: #434343;">
              Copyright © 2024 Company. All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
    `;

    // send email
    await sendEmail({
      email,
      subject: "password reset request",
      message: `your password changing process your otp is :${otp}`,
      html: emailTemplate,
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
