const express = require('express');
const {createUser} = require("../controller/user/userCtrl");
const {userlogin} = require('../controller/user/userCtrl');
const {forgotPassword} = require('../controller/user/userCtrl');
const {otpVerification} = require('../controller/user/userCtrl');
const {resetPassword} = require("../controller/user/userCtrl");
const router = express.Router();


router.post("/userlogin",userlogin);
router.post("/signup",createUser);
router.post('/forgotPassword',forgotPassword);
router.post("/otpVerification",otpVerification);
router.post('/reset-password',resetPassword),

module.exports = router;   