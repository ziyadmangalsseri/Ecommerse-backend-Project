const express = require('express');
const {createUser} = require("../controller/userCtrl");
const {userlogin} = require('../controller/userCtrl');
const {forgotPassword} = require('../controller/userCtrl');
const {otpVerification} = require('../controller/userCtrl');
const {resetPassword} = require("../controller/userCtrl");
const router = express.Router();


router.post("/userlogin",userlogin);
router.post("/signup",createUser);
router.post('/forgotPassword',forgotPassword);
router.post("/otpVerification",otpVerification);
router.post('/reset-password',resetPassword),

module.exports = router;   