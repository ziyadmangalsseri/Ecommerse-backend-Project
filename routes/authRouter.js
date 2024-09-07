const express = require('express');
const {createUser} = require("../controller/userCtrl");
const {userlogin} = require('../controller/userCtrl')
const {sendOtp} = require('../controller/userCtrl');
const {otpVerification} = require('../controller/userCtrl')
const router = express.Router();


router.post("/userlogin",userlogin);
router.post("/signup",createUser);
router.post('/forgotPassword',sendOtp);
router.post("/otpVerification",otpVerification);

module.exports = router;   